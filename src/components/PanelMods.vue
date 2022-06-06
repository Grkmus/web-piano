<template lang='pug'>
PanelTemplate(name="Mods")
  //- template(v-slot)
  //-   q-radio(v-model='mode' val="playAlong" label="Play Along" )
  //-   q-radio(v-model='mode' val="waitForInput" label="Wait for Input")
  //-   q-separator(vertical)
  //-   q-checkbox(v-model="leftHand" label="Left Hand")
  //-   q-checkbox(v-model="rightHand" label="Right Hand")
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
    const mode = ref('playAlong');
    const leftHand = ref(true);
    const rightHand = ref(true);
    const app = inject('theApp');
    return {
      app, mode, leftHand, rightHand,
    };
  },
  watch: {
    mode(newVal) { this.app.value.mode(newVal); },
    leftHand(newVal) { this.app.value.leftHand(newVal); },
    rightHand(newVal) { this.app.value.rightHand(newVal); },
  },
};
</script>

<style>
label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
