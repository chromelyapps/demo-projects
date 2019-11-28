using Microsoft.Extensions.DependencyInjection;

namespace ChromelyReactCefGlue
{
    public class Startup
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<App>();
        }

        public static int Start(IServiceCollection services, string[] args)
        {
            var provider = services.BuildServiceProvider();
            return provider.GetService<App>().Run(args);
        }
    }
}