using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Web.Chromely.Bootstrap4 {

    /// <summary> WebHost Startup Class. </summary>
    public class Startup {

        /// <summary> Constructor. </summary>
        /// <param name="configuration"> The configuration. </param>
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        /// <summary> App Configuration. </summary>
        /// <value> App Configuration. </value>
        public IConfiguration Configuration { get; }

        /// <summary> Called by the runtime. Add services to the container. </summary>
        /// <param name="services"> The services. </param>
        public void ConfigureServices(IServiceCollection services) {
            // Add framework services.
            services.AddRazorPages();
            services.AddControllersWithViews();

            // Simple example with dependency injection for a data provider.
            services.AddSingleton<Providers.IWeatherProvider, Providers.WeatherProviderFake>();
        }

        /// <summary> Called by the runtime. Configure the HTTP request pipeline. </summary>
        /// <param name="app"> The application. </param>
        /// <param name="env"> The environment. </param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                // Webpack initialization with hot-reload.
                // TODO in the process of writing a replacement for .Net Core 3.1
                // see https://github.com/dotnet/aspnetcore/issues/12890
                var clientapp_path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp");
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true, ProjectPath = clientapp_path
                });
            }
            else {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapRazorPages();
                endpoints.MapControllers();

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapFallbackToController("Index", "Home");
            });
        }
    }
}
