<template>
   <iframe id="demoframe" name="alldemoframe" src="https://shaka-player-demo.appspot.com/demo/#asset=https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd;lang=en-US;build=uncompiled" width="100%" height="800"  frameborder="0" allowfullscreen/>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GoogleShakaTests extends Vue {

}
</script>

