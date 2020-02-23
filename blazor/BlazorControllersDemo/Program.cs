using BlazorControllersDemo.Controllers;
using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Helpers;
using Chromely.Core.Infrastructure;
using Chromely.Core.Network;
using System;

namespace BlazorControllersDemo
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var config = DefaultConfiguration.CreateForRuntimePlatform();
            config.WindowOptions.Title = "chromely blazor";
            config.UrlSchemes.Add(new UrlScheme(DefaultSchemeName.RESOURCE, "http", "app", string.Empty, UrlSchemeType.Resource, false));
            config.StartUrl = "http://app/index.html";

            AppBuilder
                .Create()
                .UseConfiguration<DefaultConfiguration>(config)
                .UseApp<DemoChromelyApp>()
                .Build()
                .Run(args);
        }
    }

    public class DemoChromelyApp : ChromelyBasicApp
    {
        public override void Configure(IChromelyContainer container)
        {
            base.Configure(container);
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(DemoController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(ExecuteJavaScriptDemoController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(TmdbMoviesController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(TodoListController));
        }
    }
}
