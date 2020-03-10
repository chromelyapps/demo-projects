<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">

    <!-- Used in mobile mode -->
    <b-btn class="navbar-toggler d-lg-none mr-auto" @click="toggle_sidebar_mobile_click">
      <fa-icon icon="bars" style="font-size: 1em;"></fa-icon>
    </b-btn>

    <!-- Used in large mode -->
    <b-btn class="navbar-toggler d-none d-sm-none d-md-none d-lg-block" @click="toggle_sidebar_desktop_click">
      <fa-icon icon="bars" style="font-size: 1em;"></fa-icon>
    </b-btn>

    <a class="navbar-brand" href="#">Navbar</a>

    <div class="collapse navbar-collapse" id="navbarColor01">

      <!--

      <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">About</a>
          </li>
      </ul>



          <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search">
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>

      -->

    </div>

    <!--
    <div class="row">

        <div class="col-2">
            <button class="menu-icon" v-on:click="toggle_sidebar_click"></button>
            <a class="app-dashboard-logo">Foundation</a>
        </div>

        <div class="col">
            <div class="show-for-medium app-dashboard-search-bar-container">
                <input class="app-dashboard-search" type="search" placeholder="Search">
                <i class="app-dashboard-search-icon fa fa-search"></i>
            </div>
        </div>

        <div class="col-2">
            <button href="#" class="button hollow">Logout</button>
            <a href="#" height="30" width="30" alt=""><i class="fa fa-info-circle"></i></a>
        </div>

    </div>

    -->

  </nav>

</template>

<script src="./topnavbar.ts"></script>
<style lang="scss" src="./topnavbar.scss"></style>
