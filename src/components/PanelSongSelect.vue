<template lang='pug'>
PanelTemplate(title="Song Select")
  template(v-slot)
    .row
      label(for='filereader')  Chose a midi file:
      input#filereader(@change='loadFile' type='file' name='filereader' ref='filereader')
    .row
      label(for='songs') Or pick a predefined song:
      select#songs(v-model='selectedSong' name='songs')
        option(label='Canon in D' value='Canon in D')
        option(label='Mozart - Rondo Alla Turca' value='Mozart - Rondo Alla Turca')
</template>

<script>
import { inject, ref } from 'vue';
import { Midi } from '@tonejs/midi';
import PanelTemplate from './PanelTemplate.vue';
export default {
  name: 'PanelSongSelect',
  components: {
    PanelTemplate
  },
  emits: ['song-change'],
  setup() {
    const engine = inject('engine');
    const selectedSong = ref('Mozart - Rondo Alla Turca');
    const fileContent = ref(null)
    return {
      engine, selectedSong, fileContent
    };
  },

  methods: {
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

::-webkit-file-upload-button {
   display: none;
}

.row {
  /* display: flex;
  justify-content: flex-start;
  width: 100%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin: 10px 0; */
  width: 100%;
}
.row label {
  margin-right: 10px;
  white-space: nowrap;
}

</style>
