<template lang='pug'>
.panel
  .container
    label(for='filereader')  Chose a midi file
    input.control#filereader(@change='loadFile' type='file' name='filereader' ref='filereader')
  .container
    label(for='songs') Or pick a predefined song:
    select.control.navbar-select#songs(v-model='selectedSong' name='songs')
      option(label='Canon in D' value='Canon in D')
      option(label='Mozart - Rondo Alla Turca' value='Mozart - Rondo Alla Turca')
</template>

<script>
import { inject, ref } from 'vue';
import { Midi } from '@tonejs/midi';
import Song from '@/game/Song';
import Piano from '@/game/Piano'

export default {
  name: 'PanelSongSelect',
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

<style>
.panel {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

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
