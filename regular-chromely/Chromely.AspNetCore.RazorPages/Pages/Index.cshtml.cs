
namespace Chromely.AspNetCore.RazorPages.Pages;

public class IndexModel : PageModel
{
    [BindProperty(SupportsGet = true)]
    public string? Objective { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Platform { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Version { get; set; }


    private readonly IChromelyInfo _chromelyInfo;

    public IndexModel(IChromelyInfo chromelyInfo)
    {
        _chromelyInfo = chromelyInfo;
    }

    public void OnGet()
    {
        var infoDc = _chromelyInfo.GetInfo() as IDictionary<string, string>;
        if (infoDc != null)
        {
            Objective = infoDc.ContainsKey("objective") ? infoDc["objective"] : Objective;
            Platform = infoDc.ContainsKey("platform") ? infoDc["platform"] : Platform;
            Version = infoDc.ContainsKey("version") ? infoDc["version"] : Version;
        }
    }
}