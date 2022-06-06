<template lang='pug'>
PanelTemplate(name="Looping")
  //- template(v-slot)
  //-   q-checkbox(v-model='isLooping' dense)
  //-   q-range(
  //-     :disable='!isLooping'
  //-     v-model='limits'
  //-     :min="0"
  //-     :max="50"
  //-     :dense='true'
  //-     @change="change"
  //-     label
  //-   )
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
    const isLooping = ref(false);
    const limits = ref({
      min: 10,
      max: 35,
    });
    const app = inject('theApp');
    console.log(app);
    return { app, isLooping, limits };
  },
  watch: {
    isLooping(newVal) {
      if (newVal) {
        this.app.value.loop(this.limits);
      }
    },
  },
  methods: {
    change() { this.app.value.loop(this.limits); },
  },
};
</script>

<style>
</style>
