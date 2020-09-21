<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-light bg-faded">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Brand -->
      <a class="navbar-brand text-muted" href="#">Demos</a>

      
      <!-- Links -->
      <div class="collapse navbar-collapse justify-content-end" id="nav-content">   
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link"><router-link to="/">home</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><router-link to="/tmdbmovies">tmdb movies</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><router-link to="/todolist">todo list</router-link></a>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">basics</a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item"><router-link to="/msgrouter">Message Router Demo</router-link></a>
                <a class="dropdown-item"><router-link to="/ajax">Ajax Demo</router-link></a>
                <a class="dropdown-item"><router-link to="/javascriptdemo">Execute JavaScript Demo</router-link></a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item"><router-link to="/html5tests">HTML5 Tests</router-link></a>
                 <a class="dropdown-item"><router-link to="/html6tests">HTML6 Tests</router-link></a>
                <a class="dropdown-item"><router-link to="/shakatests">Google Shaka Support Tests</router-link></a>
                 <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0);"><router-link to="/" v-on:click.native="showDevTools">Show DevTools</router-link></a>
            </div>
        </li>
      </ul>
      </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <div class="text-center m-0  d-flex flex-column justify-content-center">
                   <router-view/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
var chromelyService = require('../src/services/ChromelyService');

@Component
export default class App extends Vue {

    showDevTools() {
         chromelyService.openExternalUrl('http://command.com/democontroller/showdevtools');
    }
}
</script>

<style>
.navbar {
    background:none;
    box-shadow: none;
  }
  .navbar-brand
  {
    font-family: 'Palatino';
    font-style: italic;
    color:grey;
    font-size: 30px;
    margin: 0px;
  }
  iframe, object, embed {
      max-width: 100%;
  }
</style>

