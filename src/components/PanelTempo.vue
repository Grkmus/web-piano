<template lang="pug">
.panel
  h4(for='tempo') Tempo (bpm)
  input#tempo(v-model='tempo' type='range' name='tempo' min='1' max='240' step='1')
  input#tempo(v-model='tempo' type='number' name='tempoInput') 

</template>

<script>
import { inject, ref } from 'vue';
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'PanelTempo',
  components: {
    PanelTemplate,
  },
  setup() {
    const engine = inject('engine');
    return { engine, tempo: ref(120) };
  },
  mounted() {
    this.engine.on('tempoChange', (tempo) => {
      this.tempo = tempo
    })
  },
  watch: {
    tempo(newVal) {
      this.engine.tempoChange(newVal);
    },
  },
};
</script>

<style>
.panel input[type="range"] {
    margin-right: 10px;
}
.panel input[type="number"] {
    width: 50px;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    border: none;
}
</style>