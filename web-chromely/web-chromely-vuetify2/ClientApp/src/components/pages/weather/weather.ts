import { Component, Vue } from 'vue-property-decorator';

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

@Component
export default class FetchDataComponent extends Vue {
    public forecasts: WeatherForecast[] = [];
    public total: number = 0;
    
    private mounted() {

        // Controller api location
        var url = new URL('api/Weather/Forecasts', window.location.origin);

        // Add some query parameters
        var params: Record<string, string> = { from: '1', to: '5'};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        // Pull data from Controller
        fetch(url.toString())
            .then((response) => response.json())
            .then((data) => {
                this.forecasts = data.forecasts as WeatherForecast[]
                this.total = data.total;
            });
    }
}
