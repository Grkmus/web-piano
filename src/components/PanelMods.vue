<template lang='pug'>
.panel
  label Mod
  .column
    .row
      label(for='play-along') Play along
      input#play-along(type='radio' name='mode' value='playAlong' v-model='mode')
      label(for='wait-input') Wait for input
      input#wait-input(type='radio' name='mode' value='waitInput' v-model='mode')
    .row
      label(for='left-hand') Left Hand
      input#left-hand(type='checkbox' name='left-hand' value='leftHand' v-model='leftHand')
      label(for='right-hand') Right Hand
      input#right-hand(type='checkbox' name='left-hand' value='rightHand' v-model='rightHand')
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
    mode(newVal) { this.engine.value.mode(newVal); },
    leftHand(newVal) { this.engine.value.leftHand = newVal; },
    rightHand(newVal) { this.engine.value.rightHand = newVal; },
  },
};
</script>

<style>

.panel {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
