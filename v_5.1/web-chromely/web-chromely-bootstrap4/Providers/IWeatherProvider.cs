using Web.Chromely.Bootstrap4.Models;
using System.Collections.Generic;

namespace Web.Chromely.Bootstrap4.Providers {

    /// <summary> Interface for weather provider. </summary>
    public interface IWeatherProvider {

        /// <summary> Gets the forecasts. </summary>
        /// <returns> The forecasts. </returns>
        List<WeatherForecast> GetForecasts();
    }
}
