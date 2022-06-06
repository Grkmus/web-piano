<template lang='pug'>
#keyboard(ref="keyboard")
  octave(
    v-for='k in octaveAmount'
    :ref='k'
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
