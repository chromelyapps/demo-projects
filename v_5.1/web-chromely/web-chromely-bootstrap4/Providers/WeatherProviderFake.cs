using Web.Chromely.Bootstrap4.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Web.Chromely.Bootstrap4.Providers {

    /// <summary> Weather Provider. </summary>
    public class WeatherProviderFake : IWeatherProvider {
        private readonly string[] summaries = {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        /// <summary> Gets or sets the weather forecasts. </summary>
        /// <value> The weather forecasts. </value>
        private List<WeatherForecast> WeatherForecasts { get; set; }

        /// <summary> Default constructor. </summary>
        public WeatherProviderFake() {
            Initialize(50);
        }

        /// <summary> Initializes this object. </summary>
        /// <param name="quantity"> The quantity. </param>
        private void Initialize(int quantity) {
            var rng = new Random();
            WeatherForecasts = Enumerable.Range(1, quantity).Select(index => new WeatherForecast {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = summaries[rng.Next(summaries.Length)]
            }).ToList();
        }

        /// <summary> Gets the forecasts. </summary>
        /// <returns> The forecasts. </returns>
        public List<WeatherForecast> GetForecasts() {
            return WeatherForecasts;
        }
    }
}
