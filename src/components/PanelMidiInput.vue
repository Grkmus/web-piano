<template lang='pug'>
PanelTemplate(title="Midi Input")
  template(v-slot)
    select#midi-inputs(v-if="availableInputs?.length > 0" v-model='selectedInput' name='songs')
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
    const midiDevice = ref(null)
    return {
      availableInputs, selectedInput, midiDevice
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
  watch: {
    midiDevice() {
      this.midiDevice.addListener('noteon', 'all', (e) => {
        const velocity = e.velocity
        const { octave, name: pitch, number: midi } = e.note;
        const event = new CustomEvent('note-on', {
          detail: { octave, pitch, midi, velocity },
        });
        window.dispatchEvent(event);
      });
      this.midiDevice.addListener('noteoff', 'all', (e) => {
        const velocity = e.velocity
        const { octave, name: pitch, number: midi } = e.note;
        const event = new CustomEvent('note-off', {
          detail: { octave, pitch, midi, velocity },
        });
        window.dispatchEvent(event);
      });
    },
    selectedInput(newVal) {
      this.midiDevice = WebMidi.getInputByName(newVal);
    },
  }
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
