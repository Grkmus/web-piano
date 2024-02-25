<template lang="pug">
.panel
  input#looping(v-model='loopEnabled' type='checkbox' name='looping' min='1' max='240' step='1')
  input#loop-start(v-model='limits.min' type='number' name='loop-start' step='1000' :disabled='!loopEnabled' style='width: 50px')
  input#loop-end(v-model='limits.max' type='number' name='loop-end' step='1000' :disabled='!loopEnabled' style='width: 50px')
</template>

<script>
import { inject, ref } from 'vue';
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'PanelLooping',
  components: {
    PanelTemplate,
  },
  setup() {
    const loopEnabled = ref(false);
    const limits = ref({
      min: 1000,
      max: 3500,
    });
    const engine = inject('engine');
    return { engine, loopEnabled, limits };
  },
  watch: {
    loopEnabled(newVal) {
      if (newVal) {
        this.engine.enableLooping(this.limits);
      } else {
        this.engine.disableLooping();
      }
    },
    limits: {
      handler(newVal) {
        if (newVal) {
          this.engine.enableLooping(this.limits);
        } else {
          this.engine.disableLooping();
        }
      },
      deep: true,
    },
  },
  methods: {
    change() {
      this.engine.loop(this.limits);
    },
  },
};
</script>
