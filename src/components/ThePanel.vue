<script setup>
import PanelSongSelect from '@/components/PanelSongSelect.vue';
import PanelPlayer from '@/components/PanelPlayer.vue';
import PanelMods from '@/components/PanelMods.vue';
import PanelTempo from '@/components/PanelTempo.vue';
import PanelLooping from '@/components/PanelLooping.vue';
import AboutAuthor from '@/components/AboutAuthor.vue';
</script>

<template lang="pug">
#panel
  h2
    a(href='/') Web Piano
  PanelSongSelect
  PanelPlayer
  PanelMods
  PanelTempo
  PanelLooping
  AboutAuthor

</template>

<style>
body {
    margin: 0;
    /* font-family: 'Lato', sans-serif; */
}
#panel {
  display: flex;
  justify-content: space-around;
  font-family: 'Roboto', sans-serif;
  align-items: center;
  /* border: medium solid red; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* margin: 1px; */
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}
.panel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
#panel a {
    color: #fff;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
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
