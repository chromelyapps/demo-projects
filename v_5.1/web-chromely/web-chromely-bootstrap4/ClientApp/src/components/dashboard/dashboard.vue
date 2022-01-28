<template>
  <div>
    <topnavbar-component />
    <div class="app-dashboard container-fluid">
      <div class="app-dashboard-body row flex-xl-nowrap">
        <sidebar-component />
        <div class="app-dashboard-body-content col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./dashboard.ts"></script>
<!-- <style lang="scss" src="./dashboard.scss"></style> -->
