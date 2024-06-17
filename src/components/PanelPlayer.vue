<template lang='pug'>
.panel
  .controls
    button.control(:disabled="!checkPianoLoaded" @click='stepBackward')
      font-awesome-icon(icon='step-backward')
    button.control(:disabled="!checkPianoLoaded" @click='playPause')
      font-awesome-icon(v-if='isPlaying' icon='pause')
      font-awesome-icon(v-else icon='play')
    button.control(:disabled="!checkPianoLoaded" @click='stop')
      font-awesome-icon(icon='stop')
    button.control(:disabled="!checkPianoLoaded" @click='stepForward')
      font-awesome-icon(icon='step-forward')
</template>

<script>
import { inject, ref } from 'vue';
import { Midi } from '@tonejs/midi';
import Song from '@/game/Song';
import Piano from '@/game/Piano'

export default {
  name: 'PanelPlayer',
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
    loadFile(event) {
      console.log('loading the file');
      this.isPlaying = false;
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const midi = new Midi(e.target.result);
          this.engine.placeSong(midi);
        };
        // readAsArrayBuffer triggers the load event!
        reader.readAsArrayBuffer(file); // Use readAsText for text files, other methods for different file types
      }
    },
  },
};
</script>

<style scoped>
.control {
  background-color: #444;
  border: none;
  color: #fff;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}
.controls {
  display: flex;
  justify-content: space-around;
}
.control:hover {
    background-color: #555;
}

.navbar-select {
    padding: 10px;  
    margin: 0 5px;
    border: none;
    border-radius: 5px;
}
</style>
