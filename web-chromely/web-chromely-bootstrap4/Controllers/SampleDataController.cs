using Web.Chromely.Bootstrap4.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Web.Chromely.Bootstrap4.Controllers {

    /// <summary> Sample Data Controller. </summary>
    [Route("api/[controller]")]
    public class SampleDataController : Controller {

        /// <summary> The summaries. </summary>
        private static readonly string[] Summaries = {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        /// <summary> HTTP GET requests - weather forecasts. </summary>
        /// <returns> A range of weather forecasts. </returns>
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts() {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
    }
}
