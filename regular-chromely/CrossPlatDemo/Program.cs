using System;
using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Network;
using CrossPlatDemo.Controllers;

namespace CrossPlatDemo
{
    class Program
    {
       [STAThread]
        static void Main(string[] args)
        {
            /* For local and embedded (assembly) resources
             * var config = DefaultConfiguration.CreateForRuntimePlatform();
             * config.StartUrl = "app://app/chromely.html" // local;
             * config.StartUrl = "assembly://app/chromely.html // assembly";
             * config.StartUrl = "mixassembly://app/chromely.html // mixed - local + assembly";
             */

            AppBuilder
            .Create()
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