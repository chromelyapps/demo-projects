// Copyright © 2017-2020 Chromely Projects. All rights reserved.
// Use of this source code is governed by MIT license that can be found in the LICENSE file.

using Chromely;
using Chromely.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace CrossPlatDemo.Demo
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            //var config = DefaultConfiguration.CreateForRuntimePlatform();
            //config.StartUrl = "https://google.com";
            //config.StartUrl = "local://app/index.html";

            // Frameless/draggable
            //config.StartUrl = "local://app/index_frameless.html";

            // config.StartUrl = "local://app/index_draggable.html";
            // config.WindowOptions.FramelessOption.UseWebkitAppRegions = true;

            AppBuilder
            .Create()
            //.UseConfig<DefaultConfiguration>(config)
            //.UseWindow<DemoWindow>()
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