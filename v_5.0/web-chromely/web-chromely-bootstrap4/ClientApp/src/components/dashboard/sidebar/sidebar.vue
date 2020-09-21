<template>
  <div id="app-dashboard-sidebar"
       class="app-dashboard-sidebar bd-sidebar sidebar col-12 col-md-3 col-xl-2"
       v-bind:class="{ 'sidebar-mobile-show': toggsidebar_mobile, 'sidebar-desktop-show': toggsidebar_desktop }">
    <div class="app-dashboard-sidebar-title-area">
      <h3 class="app-dashboard-sidebar-block-title">App Title</h3>
    </div>
    <navbar-component />
  </div>
</template>

<script src="./sidebar.ts"></script>
<style lang="scss" src="./sidebar.scss"></style>
