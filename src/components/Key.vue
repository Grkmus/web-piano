<template lang="pug">
div(v-bind:class='{ pressed: currentVelocity}' :style=`{"background-color": keyColor}`)
  //- span {{ note }}
</template>

<script>
import { color } from 'd3-color';
import { colorScale } from '../game/Note';

export default {
  name: 'KeyComponent',
  props: {
    velocity: Number,
    note: String,
    midiNumber: Number,
  },
  data() {
    return {
      currentVelocity: 0,
    };
  },
  mounted() {
    window.addEventListener('reset', this.releaseKey);
  },
  computed: {
    keyColor() {
      return color(colorScale(this.midiNumber));
    }
  },

  methods: {
    pressKey(velocity, midiNumber) {
      // piano.keyDown({ midi: 72 });
      this.currentVelocity = 100;
    },
    releaseKey(midiNumber) {
      this.currentVelocity = 0;
      // piano.keyUp({ midi: midiNumber });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.pressed {
  box-shadow: 0 5px #666;
}
</style>
