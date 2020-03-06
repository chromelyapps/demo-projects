<template>

  <div class="app-dashboard-sidebarmenu">

    <v-list>

      <v-list-group prepend-icon="fa-cog" value="true">

        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Basic Examples</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item to="/counter">
          <v-list-item-title>Counter Example</v-list-item-title>
        </v-list-item>

        <v-list-item to="/staticpage">
          <v-list-item-title>Static Page</v-list-item-title>
        </v-list-item>

        <v-list-item to="/fetchdata">
          <v-list-item-title>Fetch Data Example</v-list-item-title>
          <v-list-item-action>
            <v-icon>fa-cog</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item to="/weather">
          <v-list-item-title>Weather Fetch Data</v-list-item-title>
          <v-list-item-action>
            <v-icon>fa-cog</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item to="/test1">
          <v-list-item-title>Test1</v-list-item-title>
        </v-list-item>

      </v-list-group>

      <v-list-group>

        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>Sub Menu Example</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-group sub-group no-action>

          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title>Sub Menu1 1</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item>
            <v-list-item-title>Thing1</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Thing2</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Thing3</v-list-item-title>
          </v-list-item>

        </v-list-group>

      </v-list-group>

    </v-list>

  </div>
</template>

<script src="./sidebarmenu.ts"></script>
