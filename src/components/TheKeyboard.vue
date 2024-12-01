<template lang="pug">
#keyboard(ref="keyboard")
  octave(
    v-for='k in octaves'
    ref="octaves"
    :octaveWidth='octaveWidth'
    :keyWidth='keyWidth'
    :key='k'
    :octave='k'
  )
</template>

<script>
import Octave from './KeyOctave.vue';
import WebMidi from 'webmidi';
import piano from '@/game/Piano';
import keyboardMapping from '@/utils/keyboardMapping'
import { keysToBePressed } from '../game/Note';
import _ from 'lodash'

export default {
  name: 'TheKeyboard',
  components: {
    Octave,
  },
  props: {
    octaveAmount: {
      type: Number,
      default: 7,
    },
    startingOctave: {
      type: Number,
      default: 2
    }
  },
  inject: ['engine'],
  data() {
    return {
      sheetWidth: null,
      octaveWidth: null,
      keyWidth: null,
      availableInputs: null,
      selectedInput: null
    };
  },
  computed: {
    octaves() {
      return _.range(this.startingOctave, this.startingOctave + this.octaveAmount)
    }
  },
  mounted() {
    this.octaveWidth = this.$refs.keyboard.offsetWidth / this.octaveAmount;
    this.keyWidth = this.octaveWidth / 12;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.engine.value.stepBackward()
      if (e.key === 'ArrowRight') this.engine.value.stepForward()
      if (!keyboardMapping[e.key]) return
      const { octave, pitch, midi } = keyboardMapping[e.key];
      if (keysToBePressed.has(midi)) {
        keysToBePressed.delete(midi)
        this.engine.value.keysBeingPressed.add(midi)
        this.engine.value.start()
      }
      piano.keyDown({ midi });
      this.$refs.octaves[octave - 1].$refs[pitch].pressKey();
    });

    window.addEventListener('keyup', (e) => {
      if (!keyboardMapping[e.key]) return
      const { octave, pitch, midi } = keyboardMapping[e.key]
      piano.keyUp({ midi });
      this.$refs.octaves[octave - 1].$refs[pitch].releaseKey();

    });

    window.addEventListener('note-on', (e) => {
      const { octave, pitch, midi, velocity } = e.detail;
      if (keysToBePressed.has(midi)) {
        keysToBePressed.delete(midi)
        this.engine.value.keysBeingPressed.add(midi)
        this.engine.value.start()
      }
      piano.keyDown({ midi, velocity });
      this.$refs.octaves[octave - 1].$refs[pitch].pressKey();
    });

    window.addEventListener('note-off', (e) => {
      const { octave, pitch, midi, velocity } = e.detail;
      piano.keyUp({ midi, velocity });
      this.$refs.octaves[octave - 1].$refs[pitch].releaseKey();
    });
  },
};
</script>

<style>
#keyboard {
  display: flex;
  margin-top: -5px;
  margin-bottom: 0px;
  background-color: black;
}
</style>
