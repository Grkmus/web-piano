<template lang='pug'>
#sheet(ref="scene")
  canvas(ref="myCanvas")
</template>

<script>
import initialize from '@/game/Sketch.js';

export default {
  name: 'TheSheet',
  emits: 'app-ready',
  data() {
    return {
      noteContainers: null,
    };
  },
  async mounted() {
    initialize(this.$refs.myCanvas, this.$refs.scene).then(engine => {
      this.$emit('app-ready', engine)
    })
  },
};
</script>
