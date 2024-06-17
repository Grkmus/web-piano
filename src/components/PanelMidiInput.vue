<template lang='pug'>
.panel(v-if="availableInputs")
  h4 Midi Input
  select#midi-inputs(v-if="availableInputs.length > 0" v-model='selectedInput' name='songs')
    option(:key='input' v-html='input' :value='input' v-for='input in availableInputs')
  span(v-else) No input available
</template>

<script>
import WebMidi from 'webmidi';
import { ref } from 'vue';
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'PanelMidiInput',
  components: {
    PanelTemplate,
  },
  setup() {
    const availableInputs = ref(null)
    const selectedInput = ref(null)
    return {
      availableInputs, selectedInput,
    };
  },
  mounted() {
    WebMidi.enable(() => {
      console.log(WebMidi.inputs);
      console.log(WebMidi.outputs);
      this.availableInputs = WebMidi.inputs.map((input) => input.name);
      this.selectedInput = this.availableInputs[0]; //eslint-disable-line
    });
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
