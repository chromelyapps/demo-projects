namespace Chromely.AspNetCore.Mvc.Controllers;

public class HomeController : Controller
{
    private readonly IChromelyInfo _chromelyInfo;

    public HomeController(IChromelyInfo chromelyInfo)
    {
        _chromelyInfo = chromelyInfo;
    }

    public IActionResult Index()
    {
        Info info = new();
        var infoDc = _chromelyInfo.GetInfo() as IDictionary<string, string>;
        if (infoDc != null)
        {
            info.Objective = infoDc.ContainsKey("objective") ? infoDc["objective"] : info.Objective;
            info.Platform = infoDc.ContainsKey("platform") ? infoDc["platform"] : info.Platform;
            info.Version = infoDc.ContainsKey("version") ? infoDc["version"] : info.Version;
        }

        return View(info);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}