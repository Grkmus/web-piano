<template lang='pug'>
PanelTemplate(title="Mode")
  template(v-slot)
    font-awesome-icon#left-hand-icon(icon="hand")
    input.input(type='checkbox' name='left-hand' value='leftHand' v-model='leftHand')
    input.input(type='checkbox' name='left-hand' value='rightHand' v-model='rightHand')
    font-awesome-icon(icon="hand")
    .row
      .row
        input.mode#play-along(type='radio' name='mode' value='playAlong' v-model='mode')
        label(for='play-along') Play along
      .row
        input.mode#wait-input(type='radio' name='mode' value='waitInput' v-model='mode')
        label(for='wait-input') Wait for input
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
.row {
  display: flex;
  flex-direction: row;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
