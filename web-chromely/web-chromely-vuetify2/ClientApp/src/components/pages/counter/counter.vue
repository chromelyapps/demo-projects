<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <h1>Counter</h1>

        <p>This is a simple example of a Vue.js component. <v-icon>fa-cog</v-icon></p>

        <p>Current count: <strong>{{ currentcount }}</strong></p>

        <v-btn @click="incrementCounter">Increment</v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./counter.ts"></script>
