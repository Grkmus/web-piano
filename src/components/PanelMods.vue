<template lang='pug'>
.panel
  label Mod
  .column
    .row
      //- label(for='left-hand') Left Hand
      font-awesome-icon#left-hand-icon(icon="hand")
      input.input(type='checkbox' name='left-hand' value='leftHand' v-model='leftHand')
      //- label(for='right-hand') Right Hand
      input.input(type='checkbox' name='left-hand' value='rightHand' v-model='rightHand')
      font-awesome-icon(icon="hand")
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
</style>
