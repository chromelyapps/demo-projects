<template>
  <div class="app-dashboard-sidebar">

    <v-navigation-drawer v-model="sidebar_visible" clipped fixed app>
      <div class="app-dashboard-sidebar-title-area">
        <h3 class="app-dashboard-sidebar-block-title">App Title</h3>
      </div>
      <sidebarmenu-component />
    </v-navigation-drawer>

  </div>
</template>

<script src="./sidebar.ts"></script>
