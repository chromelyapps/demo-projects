<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <div>
          <h1>Weather forecast</h1>

          <p>This component demonstrates fetching data from the server.</p>

          <v-simple-table v-if="forecasts.length" class="table">
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
          </v-simple-table>

          <p v-else><em>Loading...</em></p>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./fetchdata.ts"></script>
