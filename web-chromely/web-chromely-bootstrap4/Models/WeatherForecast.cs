namespace Web.Chromely.Bootstrap4.Models {

    /// <summary> Weather Forecast. </summary>
    public class WeatherForecast {

        /// <summary> string formatted date. </summary>
        /// <value> Formatted date. </value>
        public string DateFormatted { get; set; }

        /// <summary> The temperature in Centigrade. </summary>
        /// <value> The temperature Centigrade. </value>
        public int TemperatureC { get; set; }

        /// <summary> Gets or sets the summary. </summary>
        /// <value> The summary. </value>
        public string Summary { get; set; }

        /// <summary> Gets the temperature in Fahrenheit. </summary>
        /// <value> temperature in Fahrenheit. </value>
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    }
}
