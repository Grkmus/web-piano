<template lang='pug'>
.panel
  .container
    label(for='filereader')  Chose a midi file
    input#filereader(@change='readFile' type='file' name='filereader' ref='filereader')
  .container
    label(for='songs') Or pick a predefined song:
    select#songs(v-model='selectedSong' name='songs')
      option(label='Canon in D' value='Canon in D')
      option(label='Mozart - Rondo Alla Turca' value='Mozart - Rondo Alla Turca')
  .controls
    font-awesome-icon.control(@click='stepBackward' icon='step-backward')
    font-awesome-icon.control(v-if='isPlaying' @click='pause' icon='pause')
    font-awesome-icon.control(v-else @click='play' icon='play')
    font-awesome-icon.control(@click='stop' icon='stop')
    font-awesome-icon.control(@click='stepForward' icon='step-forward')
</template>

<script>
import { inject, ref } from 'vue';

export default {
  name: 'PanelPlayer',
  setup() {
    const engine = inject('engine');
    const isPlaying = ref(false);
    const selectedSong = ref('Mozart - Rondo Alla Turca');
    return { engine, isPlaying, selectedSong };
  },

  methods: {
    play() {
      this.isPlaying = true;
      this.engine.value.start();
    },
    stop() {
      this.isPlaying = false;
      this.engine.value.stop();
    },
    pause() {
      this.isPlaying = false;
      this.engine.value.pause();
    },
    stepForward() {
      this.engine.value.stepForward();
    },
    stepBackward() {
      this.engine.value.stepBackward();
    },
    readFile() {
      // triggers the load event!
      this.isPlaying = false;
      this.reader.readAsArrayBuffer(this.$refs.filereader.files[0]);
      const rawFileName = this.$refs.filereader.files[0].name;
      console.log(rawFileName)
    },
  },
};
</script>

<style>
.panel {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.control {
  margin: 5px;
}
.controls {
  display: flex;
  justify-content: space-around;
}
</style>
