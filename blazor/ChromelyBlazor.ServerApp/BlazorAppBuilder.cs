namespace ChromelyBlazor.ServerApp;

public sealed class BlazorAppBuilder
{
    private readonly WebApplicationBuilder _hostBuilder;
    private WebApplication? _host;

    private BlazorAppBuilder(WebApplicationBuilder hostBuilder)
    {
        _hostBuilder = hostBuilder;
    }

    public static BlazorAppBuilder Create(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddRazorPages();
        builder.Services.AddServerSideBlazor();

        var appBuilder = new BlazorAppBuilder(builder);

        return appBuilder;
    }

    public BlazorAppBuilder Build()
    {
        _host = _hostBuilder.Build();
        return this;
    }


    public void Run(int port)
    {
        if (_host.Environment.IsDevelopment())
        {
            _host.UseDeveloperExceptionPage();
        }
        else
        {
            _host.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            _host.UseHsts();
        }

        _host.UseHttpsRedirection();

        _host.UseStaticFiles();
        
        _host.UseRouting();

        _host.MapBlazorHub();
        _host.MapFallbackToPage("/_Host");

        _host?.Run($"https://127.0.0.1:{port}");
    }
}