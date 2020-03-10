using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using Chromely;
using Chromely.CefGlue.Browser;
using Chromely.Core;
using Chromely.Core.Configuration;

namespace Web.Chromely.Bootstrap4 {

    /// <summary> Main Program. </summary>
    public class Program {

        /// <summary> Main entry-point for this application. </summary>
        /// <param name="args"> An array of command-line argument strings. </param>
        [STAThread]
        public static void Main(string[] args) {

            // Get the config settings
            var config = GetSettings();
            // Get the urls in use so we can pass them to chromely
            var appurls = config.GetValue<string>("app:urls").Split(";");

            if (Environment.GetEnvironmentVariable("ASPNETCORE_CHROMELY") != "false") {
                // This is called when we run with Chromely enabled (true by default)

                // Setup the Web Host Builder to listen on a port
                // But only do this when the parent process is launched initially
                // not when Chromely launches itself as a child process
                var proctype = ClientAppUtils.GetProcessType(args);
                if (proctype == ProcessType.Browser) {
                    CreateWebHostBuilder(config, args).UseUrls(appurls).Build().Start();
                }
                ChromelyBootstrap(args, appurls);
            }
            else {
                // This is called when we just run as a website without Chromely
                CreateWebHostBuilder(config, args).UseUrls(appurls).Build().Run();
            }
        }

        /// <summary> Gets the configuration settings. </summary>
        /// <returns> The configuration settings. </returns>
        private static IConfigurationRoot GetSettings() {
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
            if (cfgurls == null) {
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
        private static IWebHostBuilder CreateWebHostBuilder(IConfigurationRoot config, string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseConfiguration(config)
                .UseStartup<Startup>();

        /// <summary> Discover the Application URLs. </summary>
        /// <returns> The Application URLs. </returns>
        public static string[] GetAppUrl() {
            // Default urls to use
            var appurls = new[] { $"http://localhost:{FreeTcpPort()}" };
            // Check to see if the url to use has been specified in the launchSettings.json
            var envurls = Environment.GetEnvironmentVariable("ASPNETCORE_URLS");
            if (envurls != null) {
                appurls = envurls.Split(";");
            }
            return appurls;
        }

        /// <summary> Bootstrap the Chromely browser. </summary>
        public static void ChromelyBootstrap(string[] args, string[] appurls) {
            var config = DefaultConfiguration.CreateForRuntimePlatform();
            config.WindowOptions.Title = "Title Window";
            config.StartUrl = appurls.First();

            AppBuilder
                .Create()
                .UseConfiguration<DefaultConfiguration>(config)
                .UseApp<ChromelyBasicApp>()
                .Build()
                .Run(args);
        }

        /// <summary> Find the next free TCP port for dynamic allocation. </summary>
        /// <returns> Free TCP Port. </returns>
        private static int FreeTcpPort() {
            var listener = new TcpListener(IPAddress.Loopback, 0);
            listener.Start();
            try {
                return ((IPEndPoint)listener.LocalEndpoint).Port;
            }
            finally {
                listener.Stop();
            }
        }
    }
}
