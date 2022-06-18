<template lang='pug'>
.panel
  label Mod
  .column
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
    mode(newVal) { this.engine.mode(newVal); },
    leftHand(newVal) { this.engine.leftHand = newVal; },
    rightHand(newVal) { this.engine.rightHand = newVal; },
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
  align-items: center;
}
</style>
