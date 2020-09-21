using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Web.Chromely.Bootstrap4.Controllers {

    /// <summary> Home Controller. </summary>
    public class HomeController : Controller {

        /// <summary> Index Page. </summary>
        /// <returns> The view. </returns>
        public IActionResult Index() {
            return View();
        }

        /// <summary> Error Page. </summary>
        /// <returns> The view. </returns>
        public IActionResult Error() {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
