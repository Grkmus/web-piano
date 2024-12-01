<template lang='pug'>
PanelTemplate(title="Song Select")
  template(v-slot)
    .row
      label(for='filereader' class='upload-button')
        input(@change='loadFile' type='file' name='filereader' ref='filereader' class='file-input')#filereader
        font-awesome-icon(icon='upload') <!-- Add the icon here -->
        |  Upload a midi file
    .row
      label(for='songs') Or pick a predefined song:
      select#songs(v-model='selectedSong' name='songs')
        option(label='Mozart - Rondo Alla Turca' value='Mozart - Rondo Alla Turca')
      button.control(@click="loadPredefinedSong")
        font-awesome-icon(icon='rotate-right')
</template>

<script>
import { inject, ref } from 'vue';
import { Midi } from '@tonejs/midi';
import PanelTemplate from './PanelTemplate.vue';
import { readFile } from '../utils/helpers';

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
      console.log(file)
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const midi = new Midi(e.target.result);
          this.engine.placeSong(midi);
        };
        reader.readAsArrayBuffer(file); // Use readAsText for text files, other methods for different file types
      }
    },
    async loadPredefinedSong() {
      const midiFile = await readFile('MozartWolfgangAmadeus_AllaTurcaRondo.midi')
      this.engine.placeSong(midiFile, this.selectedSong);
    }
  },
};
</script>

<style scoped>

::-webkit-file-upload-button {
   display: none;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.row label {
  margin-right: 10px;
  white-space: nowrap;
}
#filereader {
  font-size: 1em;
  cursor: pointer;
}
#songs {
  font-size: 1em;
  background-color: #333;
  border: solid #4f4f4f;
  border-radius: 5px;
  color: white;
  /* box-shadow: 0 4px 8px 
  rgba(0, 0, 0, 0.5); */

}
.upload-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Space between icon and text */
  padding: 5px 10px;
  background-color: #444;
  color: white;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.upload-button:hover {
  background-color: #555;
}

.file-input {
  display: none; /* Hide the actual file input */
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
