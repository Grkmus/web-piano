<template lang="pug">
div(v-bind:class='{ pressed: currentVelocity}')
  //- span {{ note }}
</template>

<script>
// import piano from '@/game/Piano';

export default {
  name: 'Key',
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
  transform: translateY(4px);
}

/* span {
  position: relative;
  top: 80%;
  border-radius: 5px;
  padding: 5px;
  background: rgb(209, 208, 208);
  font: outline;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
} */
</style>
