using Chromely.CefGlue;
using Chromely.CefGlue.Winapi;
using Chromely.Core;
using Chromely.Core.Host;
using Chromely.Core.Infrastructure;
using System;
using System.Reflection;

namespace ChromelyReactCefGlue
{
    public class App
    {
        public int Run(string[] args)
        {
            try
            {
                HostHelpers.SetupDefaultExceptionHandlers();

                string startUrl = "local://dist/index.html";

                ChromelyConfiguration config = ChromelyConfiguration
                    .Create()
                    .UseDefaultSubprocess()
                    .WithDebuggingMode(true)
                    .WithAppArgs(args)
                    .WithHostBounds(1200, 900)
                    .WithHostMode(WindowState.Maximize)
                    .WithHostTitle("ChromelyReactCefGlue")
                    .WithHostIconFile("chromely.ico")
                    .WithStartUrl(startUrl)
                    .WithLogFile("logs\\ChromelyReactCefGlue.log")
                    .WithLogSeverity(LogSeverity.Info)
                    .UseDefaultLogger("logs\\ChromelyReactCefGlue.log")
                    .UseDefaultResourceSchemeHandler("local", string.Empty);

                using (var window = ChromelyWindow.Create(config))
                {
                    // Register external url schems
                    window.RegisterUrlScheme(new UrlScheme("https://github.com/mattkol/Chromely", true));

                    // window.RegisterUrlScheme(new UrlScheme("https://google.com", true));

                    /*
                     * Register service assemblies
                     * Uncomment relevant part to register assemblies
                     */

                    // 1. Register current/local assembly:
                    window.RegisterServiceAssembly(Assembly.GetExecutingAssembly());

                    // 2. Register external assembly with file name:
                    // string serviceAssemblyFile = @"C:\ChromelyDlls\Chromely.Service.Demo.dll";
                    // window.RegisterServiceAssembly(serviceAssemblyFile);

                    // 3. Register external assemblies with list of filenames:
                    // string serviceAssemblyFile1 = @"C:\ChromelyDlls\Chromely.Service.Demo.dll";
                    // List<string> filenames = new List<string>();
                    // filenames.Add(serviceAssemblyFile1);
                    // window.RegisterServiceAssemblies(filenames);

                    // 4. Register external assemblies directory:
                    // string serviceAssembliesFolder = @"C:\ChromelyDlls";
                    // window.RegisterServiceAssemblies(serviceAssembliesFolder);

                    // Scan assemblies for Controller routes
                    window.ScanAssemblies();

                    return window.Run(args);
                }
            }
            catch (Exception exception)
            {
                Log.Error(exception);
            }

            return 0;
        }
    }
}
