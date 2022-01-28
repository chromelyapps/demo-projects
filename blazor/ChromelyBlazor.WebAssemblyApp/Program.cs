// Optional config
var config = DefaultConfiguration.CreateForRuntimePlatform();
config.WindowOptions.Title = "blazor components demo";
config.UrlSchemes.Add(new UrlScheme(DefaultSchemeName.LOCALREQUEST, "http", "app", string.Empty, UrlSchemeType.LocalResource, false));
config.StartUrl = "http://app/index.html";


ThreadApt.STA();

AppBuilder
    .Create(args)
    .UseConfig<DefaultConfiguration>(config)
    .UseWindow<WindowSample>()
    .UseApp<AppSample>()
    .Build()
    .Run();