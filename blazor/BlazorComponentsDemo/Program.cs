using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Helpers;
using Chromely.Core.Infrastructure;
using System;

namespace BlazorComponentsDemo
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
    }
}
