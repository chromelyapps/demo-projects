using Web.Chromely.Vuetify2.Models;
using System.Collections.Generic;

namespace Web.Chromely.Vuetify2.Providers {

    /// <summary> Interface for weather provider. </summary>
    public interface IWeatherProvider {

        /// <summary> Gets the forecasts. </summary>
        /// <returns> The forecasts. </returns>
        List<WeatherForecast> GetForecasts();
    }
}
