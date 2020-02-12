using System;
using Chromely.Core;
using Chromely.Core.Configuration;

namespace FramelessDemo
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var config = DefaultConfiguration.CreateForRuntimePlatform();
            config.WindowOptions.WindowFrameless = true;

            AppBuilder
                .Create()
                .UseConfiguration<DefaultConfiguration>(config)
                .UseApp<App>()
                .Build()
                .Run(args);
        }
    }
}