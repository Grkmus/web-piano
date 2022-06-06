<script setup>
import ThePanel from '@/components/ThePanel.vue'
import TheKeyboard from '@/components/TheKeyboard.vue'
import TheSheet from '@/components/TheSheet.vue'
// import TheWelcome from '@/components/TheWelcome.vue'

</script>

<template lang="pug">
#game
  ThePanel
  TheSheet
  TheKeyboard

</template>

<style>


html, body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#game {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 10vh 70vh 20vh;
  grid-template-areas:
    "panel panel panel panel"
    "sheet sheet sheet sheet"
    "keyboard keyboard keyboard keyboard";
}

#panel {
  grid-area: panel;
}
#sheet {
  grid-area: sheet;
  border: solid 1px black;
}
#keyboard {
  grid-area: keyboard;
}
</style>
