<template lang='pug'>
PanelTemplate(name="Player")
  font-awesome-icon(icon='step-backward' size='2x')
  //- font-awesome-icon(v-if='isPlaying' @click='isPlaying=false' icon='pause' size='2x')
  //- font-awesome-icon(v-else='' @click='isPlaying=true' icon='play' size='2x')
  //- font-awesome-icon(@click='stop' icon='stop' size='2x')
  //- font-awesome-icon(icon='step-forward' size='2x')
</template>

<script>
import { inject } from 'vue';
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'PanelPlayer',
  components: {
    PanelTemplate,
  },
  setup() {
    const app = inject('theApp');
    console.log(app);
    return { app };
  },
  methods: {
    play() { this.app.value.start(); },
    stop() { this.app.value.stop(); },
    pause() { this.app.value.pause(); },
  },
};
</script>

<style>
</style>
