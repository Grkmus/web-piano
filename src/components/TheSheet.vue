<template lang='pug'>
#sheet
  canvas(ref="scene" style="height: 100%; width: 100%;")
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
    initialize(this.$refs.scene).then(engine => {
      this.$emit('app-ready', engine)
    })
  },
};
</script>
