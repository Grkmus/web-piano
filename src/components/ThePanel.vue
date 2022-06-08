<script setup>
import PanelPlayer from '@/components/PanelPlayer.vue';
import PanelMods from '@/components/PanelMods.vue';
import PanelTempo from '@/components/PanelTempo.vue';
import PanelLooping from '@/components/PanelLooping.vue';
// import AboutAuthor from '@/components/AboutAuthor.vue';
// import { toRefs, watch, inject } from 'vue';

// export default {
//   name: 'Panel',
//   // components: {
//   //   PanelPlayer,
//   //   // PanelMods,
//   //   // PanelTempo,
//   //   // PanelLooping,
//   //   // AboutAuthor,
//   // },
//   // setup(props) {
//   //   const app = inject('theApp')
//   //   console.log(app);
//   //   return app;
//   // },

// };
</script>
<template lang="pug">
#panel
  PanelPlayer
  PanelMods
  PanelTempo
  PanelLooping

</template>

<style>
#panel {
  display: flex;
  justify-content: space-around;
  font-family: 'Courier New', Courier, monospace;
}

</style>

