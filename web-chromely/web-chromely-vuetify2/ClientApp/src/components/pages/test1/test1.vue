
<template>
  <v-container fluid>
    <v-row justify-center align-center>
      <v-col shrink>

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn :href="source" icon large target="_blank" v-on="on">
              <v-icon large>fa-code</v-icon>
            </v-btn>
          </template>
          <span>Source</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn icon large target="_blank" v-on="on">
              <v-icon large>fa-codepen</v-icon>
            </v-btn>
          </template>
          <span>Codepen</span>
        </v-tooltip>

      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./test1.ts"></script>
