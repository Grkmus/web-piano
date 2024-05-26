<template lang="pug">
#keyboard(ref="keyboard")
  octave(
    v-for='k, i in octaveAmount'
    ref="octaves"
    :octaveWidth='octaveWidth'
    :keyWidth='keyWidth'
    :key='k'
  )
</template>

<script>
import Octave from './KeyOctave.vue';
import WebMidi from 'webmidi';
import piano from '@/game/Piano';
import keyboardMapping from '@/utils/keyboardMapping'
import generateParticle from '@/game/Effects'

export default {
  name: 'TheKeyboard',
  components: {
    Octave,
  },
  inject: ['engine'],
  props: {
    octaveAmount: {
      type: Number,
      default: 7,
    },
  },
  data() {
    return {
      sheetWidth: null,
      octaveWidth: null,
      keyWidth: null,
      availableInputs: null,
      selectedInput: null,
      particleFunctions: {}
    };
  },
  mounted() {
    WebMidi.enable(() => {
      console.log(WebMidi.inputs);
      console.log(WebMidi.outputs);
      this.availableInputs = WebMidi.inputs.map((input) => input.name);
      this.selectedInput = this.availableInputs[0]; //eslint-disable-line
    });
    this.octaveWidth = this.$refs.keyboard.offsetWidth / this.octaveAmount;
    this.keyWidth = this.octaveWidth / 12;

    window.addEventListener('keydown', (e) => {
      if (e.repeat) return
      console.log('Note On: ', e);
      // const { octave, pitch, midi } = e.detail;
      const midi = keyboardMapping[e.key] 
      piano.keyDown({midi});
      const particleContainer = this.engine.value.particleContainer
      console.log(particleContainer)
      const particle = generateParticle(particleContainer, {x: midi * this.engine.value.pixi.screen.width / 7 / 12, y: 300})
      // particle.emitNow()
      function particleLoop(deltaMS) {
        particle.update(deltaMS * 0.001);
      }
      this.particleFunctions[midi] = () => particleLoop(this.engine.value.pixi.ticker.deltaMS)
      this.engine.value.pixi.ticker.add(this.particleFunctions[midi])
      console.log(particle)
      // this.$refs.octaves[octave - 1].$refs[pitch].pressKey();
    });

    window.addEventListener('keyup', (e) => {
      console.log('Note Off: ', e);
      const midi = keyboardMapping[e.key] 
      piano.keyUp({ midi });
      this.engine.value.pixi.ticker.remove(this.particleFunctions[midi])

      // this.$refs.octaves[octave - 1].$refs[pitch].pressKey();
    });

    window.addEventListener('note-on', (e) => {
      console.log('Note On: ', e.detail);
      const { octave, pitch, midi } = e.detail;
      piano.keyDown({ midi });
      this.$refs.octaves[octave - 1].$refs[pitch].pressKey();
    });

    window.addEventListener('note-off', (e) => {
      console.log('Note Off: ', e.detail);
      const { octave, pitch, midi } = e.detail;
      piano.keyUp({ midi });
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
}
</style>
