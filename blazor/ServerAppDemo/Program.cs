using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely;
using System.Threading;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace ServerAppDemo
{
    public class Program
    {
        private static Task BlazorTask;
        private static CancellationTokenSource BlazorTaskTokenSource;

        public static void Main(string[] args)
        {
            var appName = Assembly.GetEntryAssembly()?.GetName().Name;
            var firstProcess = ServerAppUtil.IsMainProcess(args);
            var port = ServerAppUtil.AvailablePort;
            
            if (firstProcess)
            {
                if (port != -1)
                {
                    // start the kestrel server in a background thread
                    AppDomain.CurrentDomain.ProcessExit += ProcessExit;
                    BlazorTaskTokenSource = new CancellationTokenSource();
                    BlazorTask = new Task(() =>
                    {
                        CreateHostBuilder(args, port).Build().Run();
                    }, BlazorTaskTokenSource.Token, TaskCreationOptions.LongRunning);
                    BlazorTask.Start();

                    // wait till its up
                    while (ServerAppUtil.IsPortAvailable(port))
                    {
                        Thread.Sleep(1);
                    }
                }

                // Save port for later use by chromely processes
                ServerAppUtil.SavePort(appName, port);
            }
            else
            {
                // fetch port number
                port = ServerAppUtil.GetSavedPort(appName);
            }

            if (port != -1)
            {
                // start up chromely
                var core = typeof(IChromelyConfiguration).Assembly;
                var config = DefaultConfiguration.CreateForRuntimePlatform();
                config.WindowOptions.Title = "blazor server app demo";
                config.StartUrl = $"https://127.0.0.1:{port}";
                config.DebuggingMode = true;
                config.WindowOptions.RelativePathToIconFile = "chromely.ico";

                try
                {
                    var builder = AppBuilder.Create();
                    builder = builder.UseConfig<DefaultConfiguration>(config);
                    builder = builder.UseApp<DemoChromelyApp>();
                    builder = builder.Build();
                    builder.Run(args);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    throw;
                }
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args, int port) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                    .UseStartup<Startup>()
                    .UseUrls(new[] { $"https://127.0.0.1:{port}" });
                });

        private static void ProcessExit(object sender, EventArgs e)
        {
            // Clean up kestrel process if not taken down by OS. This can
            // occur when the app is closed from WindowController (frameless).
            Task.Run(() =>
            {
                WaitHandle.WaitAny(new[] { BlazorTaskTokenSource?.Token.WaitHandle });
                BlazorTask?.Dispose();
            });
            BlazorTaskTokenSource?.Cancel();
        }
    }

    public class DemoChromelyApp : ChromelyBasicApp
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            RegisterControllerAssembly(services, typeof(DemoChromelyApp).Assembly);
        }
    }
}
