<script setup>
import PanelSongSelect from '@/components/PanelSongSelect.vue';
import PanelPlayer from '@/components/PanelPlayer.vue';
import PanelMods from '@/components/PanelMods.vue';
import PanelTempo from '@/components/PanelTempo.vue';
import BuyMeACoffee from '@/components/BuyMeACoffee.vue';
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
  BuyMeACoffee
  AboutAuthor

</template>

<style>
body {
  font-family: 'Poppins', sans-serif;
}
#panel {
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}
.panel{
  display: flex;
  font-size: 16px;
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
.control {
  background-color: #444;
  border: none;
  color: #fff;
  padding: 5px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
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
