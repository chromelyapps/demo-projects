using Microsoft.Extensions.DependencyInjection;

namespace ChromelyReactCefGlue
{
    class Program
    {
        public static int Main(string[] args)
        {
            var services = new ServiceCollection();
            Startup.ConfigureServices(services);
            return Startup.Start(services, args);
        }
    }
}