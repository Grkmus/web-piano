<template lang='pug'>
.panel
  label(for='tempo') Tempo
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
  watch: {
    tempo(newVal) {
      this.engine.value.tempoChange(newVal);
    },
  },
};
</script>
