<template lang="pug">
.panel
  a(target='_blank' href='https://www.buymeacoffee.com/tosungo' id='buy-me-a-coffee')
    img(src='https://cdn.buymeacoffee.com/buttons/v2/default-orange.png' alt='Buy Me A Coffee' style="height: 40px")
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
