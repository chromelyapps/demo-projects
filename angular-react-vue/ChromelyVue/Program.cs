using System;
using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ChromelyVue
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var config = DefaultConfiguration.CreateForRuntimePlatform();
            config.StartUrl = "local://dist/index.html";

            AppBuilder
            .Create()
            .UseConfig<DefaultConfiguration>(config)
            .UseApp<DemoApp>()
            .Build()
            .Run(args);
        }
    }

    public class DemoApp : ChromelyBasicApp
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddLogging(configure => configure.AddConsole());
            services.AddLogging(configure => configure.AddFile("Logs/serilog-{Date}.txt"));

            /*
            // Optional - adding custom handler
            services.AddSingleton<CefDragHandler, CustomDragHandler>();
            */

            /*
            // Optional- using config section to register IChromelyConfiguration
            // This just shows how it can be used, developers can use custom classes to override this approach
            //
            var builder = new ConfigurationBuilder()
                    .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");

            var configuration = builder.Build();
            var config = DefaultConfiguration.CreateFromConfigSection(configuration);
            services.AddSingleton<IChromelyConfiguration>(config);
            */

            /* Optional
            var options = new JsonSerializerOptions();
            options.ReadCommentHandling = JsonCommentHandling.Skip;
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.AllowTrailingCommas = true;
            services.AddSingleton<JsonSerializerOptions>(options);
            */

            RegisterControllerAssembly(services, typeof(DemoApp).Assembly);
        }
    }
}