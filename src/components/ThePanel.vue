<script setup>
import PanelPlayer from '@/components/PanelPlayer.vue';
import PanelMods from '@/components/PanelMods.vue';
import PanelTempo from '@/components/PanelTempo.vue';
import PanelLooping from '@/components/PanelLooping.vue';
import AboutAuthor from '@/components/AboutAuthor.vue';
</script>

<template lang="pug">
#panel
  AboutAuthor
  PanelPlayer
  PanelMods
  PanelTempo
  PanelLooping

</template>

<style>
#panel {
  display: flex;
  justify-content: space-around;
  font-family: "Courier New", Courier, monospace;
}
#icon-container {
  display: flex;
  justify-content: space-evenly;
}
#about {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
