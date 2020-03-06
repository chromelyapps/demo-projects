<template>
  <div class="app-dashboard-topnavbar">

    <v-app-bar app fixed clipped-left>
      <v-app-bar-nav-icon @click.stop="$emit('sidebar-toggle')"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

  </div>
</template>

<script src="./topnavbar.ts"></script>
