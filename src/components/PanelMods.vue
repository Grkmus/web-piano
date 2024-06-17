<template lang='pug'>
.panel
  h4 Mode
  .column
    .row
      //- label(for='left-hand') Left Hand
      font-awesome-icon#left-hand-icon(icon="hand")
      input.input(type='checkbox' name='left-hand' value='leftHand' v-model='leftHand')
      //- label(for='right-hand') Right Hand
      input.input(type='checkbox' name='left-hand' value='rightHand' v-model='rightHand')
      font-awesome-icon(icon="hand")
    .row
      label(for='play-along') Play along
      input.mode#play-along(type='radio' name='mode' value='playAlong' v-model='mode')
      label(for='wait-input') Wait for input
      input.mode#wait-input(type='radio' name='mode' value='waitInput' v-model='mode')
</template>

<script>
import { inject, ref } from 'vue';
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'PanelMods',
  components: {
    PanelTemplate,
  },
  setup() {
    const engine = inject('engine');
    const mode = ref('playAlong');
    const leftHand = ref(true);
    const rightHand = ref(true);

    return {
      engine, mode, leftHand, rightHand,
    };
  },
  watch: {
    mode(newVal) { this.engine.updateMode(newVal); },
    leftHand(newVal) { this.engine.leftHand = newVal; },
    rightHand(newVal) { this.engine.rightHand = newVal; },
  },
};
</script>

<style>
#left-hand-icon {
  transform: scale(-1, 1);
}
.panel {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.input {
  margin: 5px;
}
.mode {
  margin: 10px;
}
</style>
