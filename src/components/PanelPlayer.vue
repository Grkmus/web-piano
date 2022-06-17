<template lang='pug'>
.panel
  label Player
  .controls
    font-awesome-icon.control(@click='stepBackward' icon='step-backward' size='2x')
    font-awesome-icon.control(v-if='isPlaying' @click='pause' icon='pause' size='2x')
    font-awesome-icon.control(v-else @click='play' icon='play' size='2x')
    font-awesome-icon.control(@click='stop' icon='stop' size='2x')
    font-awesome-icon.control(@click='stepForward' icon='step-forward' size='2x')
</template>

<script>
import { inject, ref } from 'vue';

export default {
  name: 'PanelPlayer',
  setup() {
    const engine = inject('engine');
    const isPlaying = ref(false)
    return { engine, isPlaying };
  },

  methods: {
    play() { 
      this.isPlaying = true
      this.engine.value.start();
    },
    stop() { 
      this.isPlaying = false
      this.engine.value.stop();
    },
    pause() { 
      this.isPlaying = false
      this.engine.value.pause();
    },
    stepForward() {
      this.engine.value.stepForward();
    },
    stepBackward() {
      this.engine.value.stepBackward();
    }
  },
};
</script>

<style>
.panel {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.control {
  margin: 5px;
}
.controls {
  display: flex;
  justify-content: space-around;
}
</style>
