<template>
  <div class="container justify-content-center">
    <div class="row justify-content-center">
      <div class="justify-content-right">
        <img src="../assets/chromely_gray.png" class="img-rounded spacer25" alt="Cinque Terre" width="160" height="160" />
      </div>
      <div class="justify-content-left">
        <img src="../assets/logo.png" class="img-rounded" alt="Cinque Terre" width="160" height="160" />
      </div>
    </div>

    <div>
        <span class="text-primary text-center"><h2>chromely vue</h2></span>
    </div>
    <div>
        <p class="text-muted text-center">Build .NET/.NET CORE HTML5 Desktop Apps</p>
    </div>
    <div>
        <p></p>
    </div>
    <div class="container col-8 justify-content-center">
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <p><b>Chromely Main Objective</b>:  {{ chromelyOjective }} </p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <p><b>Platforms</b>:  {{ chromelyPlatform }} </p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <p><b>Chromium - CefGlue Version</b>: {{ chromelyVersion }}</p>
            </li>
        </ul>
    </div>
    <div>
        <p></p>
    </div>
    <div>
        <p></p>
    </div>
    <div>
        <a href="https://github.com/chromelyapps/Chromely" class="btn btn-default" role="button" style="margin: 5px;">more info</a>
    </div>
</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
var chromelyService = require('../services/ChromelyService');

@Component
export default class Home extends Vue {

  chromelyOjective = '';
  chromelyPlatform = '';
  chromelyVersion = '';

 mounted() {
    chromelyService.messageRouterGetJson('/info', null, this.getInfoCallback);
 }

  getInfoCallback(res: any) {
    this.chromelyOjective = res.divObjective,
    this.chromelyPlatform = res.divPlatform,
    this.chromelyVersion = res.divVersion;
  }
}
</script>

