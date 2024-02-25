<script>
import ThePanel from '@/components/ThePanel.vue'
import TheKeyboard from '@/components/TheKeyboard.vue'
import TheSheet from '@/components/TheSheet.vue'
import {defineComponent, provide, ref } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    ThePanel,
    TheSheet,
    TheKeyboard,
  },
  setup() {
    const engine = ref({});
    const isEngineReady = ref(false)
    provide('engine', engine);
    return { engine, isEngineReady };
  },
  methods: {
    assingApp(engine) {
      console.log('The engine is ready', engine);
      this.engine = engine;
      this.isEngineReady = true
      window.engine = engine
    },
  },
});
</script>

<template lang="pug">
#game
  ThePanel(v-if="isEngineReady")
  TheSheet(@engine-ready="assingApp")
  TheKeyboard(v-if="isEngineReady")

</template>

<style>

@media screen and (max-height: 992px) {
  body {
    font-size: 2vh;
  }
}

html, body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#game {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 15vh 65vh 20vh;
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
