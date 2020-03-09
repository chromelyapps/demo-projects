using System;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using Chromely;
using Chromely.CefGlue.Browser;
using Chromely.Core;
using Chromely.Core.Configuration;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace web_chromely_mvc {
    public class Program {

        /// <summary> Main entry-point for this application. </summary>
        /// <param name="args"> The arguments to pass in. </param>
        [STAThread]
        public static void Main(string[] args) {

            // Get the urls in use so we can pass them to chromely
            var appurls = GetAppUrl();

            if (Environment.GetEnvironmentVariable("ASPNETCORE_CHROMELY") != "false") {
                // This is called when we run with Chromely enabled (true by default)

                // Setup the Web Host Builder to listen on a port
                // But only do this when the parent process is launched initially
                // not when Chromely launches itself as a child process

                var proctype = ClientAppUtils.GetProcessType(args);
                if (proctype == ProcessType.Browser) {
                    CreateWebHostBuilder(args).UseUrls(appurls).Build().Start();
                }
                ChromelyBootstrap(args, appurls);

            } else {
                // This is called when we just run as a website without Chromely
                CreateWebHostBuilder(args).UseUrls(appurls).Build().Run();
            }
        }

        /// <summary> Creates host builder. </summary>
        /// <param name="args"> The arguments to pass in. </param>
        /// <returns> The new webhost builder. </returns>
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

        /// <summary> Discover the Application URLs. </summary>
        /// <returns> The Application URLs. </returns>
        public static string[] GetAppUrl() {
            // Default urls to use
            var appurls = new []{ $"http://localhost:{FreeTcpPort()}" };
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
