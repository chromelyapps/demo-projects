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

    private mounted() {
        fetch('api/SampleData/WeatherForecasts')
            .then((response) => response.json() as Promise<WeatherForecast[]>)
            .then((data) => {
                this.forecasts = data;
            });
    }
}
