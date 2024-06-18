<template lang="pug">
PanelTemplate(title="Tempo (bpm)")
  template(v-slot)
    .container
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
input[type="range"] {
  margin-right: 10px;
}
input[type="number"] {
  font-size: smaller;
  height: 20px;
  width: 50px;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: none;
}
</style>