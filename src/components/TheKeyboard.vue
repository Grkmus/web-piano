<template lang='pug'>
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
  },
  data() {
    return {
      sheetWidth: null,
      octaveWidth: null,
      keyWidth: null,
    };
  },
  mounted() {
    this.octaveWidth = this.$refs.keyboard.offsetWidth / this.octaveAmount;
    this.keyWidth = this.octaveWidth / 12;

    window.addEventListener('note-on', (e) => {
      console.log('Note On: ', e.detail)
      const {octave, pitch} = e.detail
      this.$refs.octaves[octave - 1].$refs[pitch].pressKey()
    })

    window.addEventListener('note-off', (e) => {
      console.log('Note Off: ', e.detail)
      const {octave, pitch} = e.detail
      this.$refs.octaves[octave - 1].$refs[pitch].releaseKey()
    })
  },
};
</script>

<style>
#keyboard {
  display:flex;
  margin-top: -5px;
  margin-bottom: 0px;
}
</style>
