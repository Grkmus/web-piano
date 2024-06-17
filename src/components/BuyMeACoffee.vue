<template lang="pug">
a(target='_blank' href='https://www.buymeacoffee.com/tosungo' id='buy-me-a-coffee' style="height: 40px")
  img(src='https://cdn.buymeacoffee.com/buttons/v2/default-orange.png' alt='Buy Me A Coffee' style="height: 40px")
</template>

<script>
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'BuyMeACoffee',
  components: {
    PanelTemplate,
  },
};
</script>

<style>
a {
  margin: 0px;
}
</style>
