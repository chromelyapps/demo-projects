<template>
  <div>
    <h1>Weather forecast</h1>

    <p>This component uses the Weather Controller.</p>

    <table v-if="forecasts.length" class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in forecasts">
          <td>{{ item.dateFormatted }}</td>
          <td>{{ item.temperatureC }}</td>
          <td>{{ item.temperatureF }}</td>
          <td>{{ item.summary }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="forecasts.length"><b>Total: {{ total }}</b></p>

    <p v-else><em>Loading...</em></p>
  </div>
</template>

<script src="./weather.ts"></script>
