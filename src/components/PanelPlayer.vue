<template lang='pug'>
PanelTemplate(title="Player")
  template(v-slot)
    p {{ selectedSong }}
    .controls(v-if="checkPianoLoaded")
      button.control(:disabled="!checkPianoLoaded" @click='stepBackward')
        font-awesome-icon(icon='step-backward')
      button.control(:disabled="!checkPianoLoaded" @click='playPause')
        font-awesome-icon(v-if='isPlaying' icon='pause')
        font-awesome-icon(v-else icon='play')
      button.control(:disabled="!checkPianoLoaded" @click='stop')
        font-awesome-icon(icon='stop')
      button.control(:disabled="!checkPianoLoaded" @click='stepForward')
        font-awesome-icon(icon='step-forward')
    div(v-else)
      img(src="/loading.gif" style="height:20px")
      div Loading samples
</template>

<script>
import { inject, ref } from 'vue';
import Piano from '@/game/Piano'
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'PanelPlayer',
  components: {
    PanelTemplate
  },
  emits: ['song-change'],
  setup() {
    const engine = inject('engine');
    const isPlaying = ref(false);
    const selectedSong = ref('Mozart - Rondo Alla Turca');
    const checkPianoLoaded = ref(false)
    const fileContent = ref(null)
    return {
      engine, isPlaying, selectedSong, checkPianoLoaded, fileContent
    };
  },
  mounted() {
    Piano.load().then(() => {
      console.log('loaded!');
      this.checkPianoLoaded = true
    });
  },
  methods: {
    playPause() {
      this.isPlaying === true ? this.pause() : this.play() 
    },
    play() {
      this.isPlaying = true;
      this.engine.start();
    },
    stop() {
      this.isPlaying = false;
      this.engine.stop();
    },
    pause() {
      this.isPlaying = false;
      this.engine.pause();
    },
    stepForward() {
      this.engine.stepForward();
    },
    stepBackward() {
      this.engine.stepBackward();
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-around;
}

.control {
  background-color: #444;
  border: none;
  color: #fff;
  padding: 7px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.control:hover {
    background-color: #555;
}
</style>
