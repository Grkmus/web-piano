<template lang='pug'>
.panel
  .container
    label(for='filereader')  Chose a midi file
    input#filereader(@change='loadFile' type='file' name='filereader' ref='filereader')
  .container
    label(for='songs') Or pick a predefined song:
    select#songs(v-model='selectedSong' name='songs')
      option(label='Canon in D' value='Canon in D')
      option(label='Mozart - Rondo Alla Turca' value='Mozart - Rondo Alla Turca')
  .controls
    button(:disabled="!checkPianoLoaded" @click='stepBackward')
      font-awesome-icon.control(icon='step-backward')
    button(:disabled="!checkPianoLoaded" @click='playPause')
      font-awesome-icon.control(v-if='isPlaying' icon='pause')
      font-awesome-icon.control(v-else icon='play')
    button(:disabled="!checkPianoLoaded" @click='stop')
      font-awesome-icon.control(icon='stop')
    button(:disabled="!checkPianoLoaded" @click='stepForward')
      font-awesome-icon.control(icon='step-forward')
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
    const file = ref(null);
    const reader = ref(new FileReader());
    const checkPianoLoaded = ref(false)

    return {
      engine, isPlaying, selectedSong, reader, file,checkPianoLoaded
    };
  },
  mounted() {
    Piano.load().then(() => {
      console.log('loaded!');
      this.checkPianoLoaded = true
    });
    this.reader.addEventListener('load', (e) => {
      // debugger;
      console.log('reading file', e.target.result);
      // this.midiJson = new Midi(e.target.result);
      // this.rawBpm = this.midiJson.header.tempos[0].bpm;
    });

    this.reader.addEventListener('onerror', () => {
      throw new Error('Some error happened while reading the file');
    });

    this.reader.addEventListener('loadend', (e) => {
      this.file = new Midi(e.target.result);
      const song = new Song(this.file);
      console.log(this.engine);
      this.engine.placeSong(song);
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
    loadFile() {
      // triggers the load event!
      console.log('loading the file');
      this.isPlaying = false;
      // this.file = readFile()
      this.reader.readAsArrayBuffer(this.$refs.filereader.files[0]);
      // const rawFileName = this.$refs.filereader.files[0].name;
      // console.log(rawFileName)
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
