using Web.Chromely.Bootstrap4.Providers;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Web.Chromely.Bootstrap4.Controllers {

    /// <summary> Weather Controller. </summary>
    [Route("api/[controller]")]
    public class WeatherController : Controller {

        /// <summary> The weather provider. </summary>
        private readonly IWeatherProvider weatherProvider;

        /// <summary> Constructor. </summary>
        /// <param name="weatherProvider"> The weather provider. </param>
        public WeatherController(IWeatherProvider weatherProvider) {
            this.weatherProvider = weatherProvider;
        }

        /// <summary> HTTP GET requests for forecasts. </summary>
        /// <param name="from"> (Optional) From range. </param>
        /// <param name="to">   (Optional) To range. </param>
        /// <returns> An IActionResult. </returns>
        [HttpGet("[action]")]
        public IActionResult Forecasts([FromQuery(Name = "from")] int from = 0, [FromQuery(Name = "to")] int to = 4) {
            //System.Threading.Thread.Sleep(500); // Fake latency
            var quantity = to - from;

            // We should also avoid going too far in the list.
            if (quantity <= 0)
                return BadRequest("You cannot have the 'to' parameter higher than 'from' parameter.");

            if (from < 0)
                return BadRequest("You cannot go in the negative with the 'from' parameter");

            var allForecasts = weatherProvider.GetForecasts();
            var result = new {
                Total = allForecasts.Count,
                Forecasts = allForecasts.Skip(from).Take(quantity).ToArray()
            };

            return Ok(result);
        }
    }
}
