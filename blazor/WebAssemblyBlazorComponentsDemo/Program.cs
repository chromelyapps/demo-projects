using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Infrastructure;
using Chromely.Core.Network;
using System;

namespace WebAssemblyBlazorComponentsDemo
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var config = DefaultConfiguration.CreateForRuntimePlatform();
            config.WindowOptions.Title = "blazor components demo";
            config.UrlSchemes.Add(new UrlScheme(DefaultSchemeName.RESOURCE, "http", "app", string.Empty, UrlSchemeType.Resource, false));
            config.StartUrl = "http://app/index.html";

            AppBuilder
                .Create()
                .UseConfig<DefaultConfiguration>(config)
                .UseApp<DemoChromelyApp>()
                .Build()
                .Run(args);
        }
    }

    public class DemoChromelyApp : ChromelyBasicApp
    {
    }
}
