// Get the config settings
var config = GetSettings();

// Get the urls in use so we can pass them to chromely
var appurls = config.GetValue<string>("app:urls").Split(";");

if (Environment.GetEnvironmentVariable("ASPNETCORE_CHROMELY") != "false")
{
    // This is called when we run with Chromely enabled (true by default)

    // Setup the Web Host Builder to listen on a port
    // But only do this when the parent process is launched initially
    // not when Chromely launches itself as a child process
    var proctype = ClientAppUtils.GetProcessType(args);
    if (proctype == ProcessType.Browser)
    {
        CreateWebHostBuilder(config, args).UseUrls(appurls).Build().Start();
    }
    ChromelyBootstrap(args, appurls);
}
else
{
    // This is called when we just run as a website without Chromely
    CreateWebHostBuilder(config, args).UseUrls(appurls).Build().Run();
}


/// <summary> Gets the configuration settings. </summary>
/// <returns> The configuration settings. </returns>
static IConfigurationRoot GetSettings()
{
    // First read the configuration settings from the appsettings.json file
    var cfgbuilder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", true);
    var cfg1 = cfgbuilder.Build();

    // Default urls to use
    var appurls = new[] { $"http://localhost:{FreeTcpPort()}" };
    // Check to see if the url to use has been specified in the launchSettings.json
    var envurls = Environment.GetEnvironmentVariable("ASPNETCORE_URLS");
    if (envurls != null)
        appurls = envurls.Split(";");
    // Check to see if the urls are specified in appsettings.json
    var cfgurls = cfg1.GetValue<string>("app:urls");
    if (cfgurls == null)
    {
        var urldict = new Dictionary<string, string> { { "app:urls", string.Join(";", appurls) } };
        cfgbuilder.AddInMemoryCollection(urldict);
        cfg1 = cfgbuilder.Build();
    }
    return cfg1;
}

/// <summary> Creates web host builder. </summary>
/// <param name="config"> Configuration settings</param>
/// <param name="args"> An array of command-line argument strings. </param>
/// <returns> The new web host builder. </returns>
static IWebHostBuilder CreateWebHostBuilder(IConfigurationRoot config, string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .UseConfiguration(config)
        .UseStartup<Startup>();

/// <summary> Bootstrap the Chromely browser. </summary>
static void ChromelyBootstrap(string[] args, string[] appurls)
{
    var config = DefaultConfiguration.CreateForRuntimePlatform();
    config.WindowOptions.Title = "Title Window";
    config.StartUrl = appurls.First();

    AppBuilder
        .Create(args)
        .UseConfig<DefaultConfiguration>(config)
        .UseApp<ChromelyBasicApp>()
        .Build()
        .Run();
}

/// <summary> Find the next free TCP port for dynamic allocation. </summary>
/// <returns> Free TCP Port. </returns>
static int FreeTcpPort()
{
    var listener = new TcpListener(IPAddress.Loopback, 0);
    listener.Start();
    try
    {
        return ((IPEndPoint)listener.LocalEndpoint).Port;
    }
    finally
    {
        listener.Stop();
    }
}