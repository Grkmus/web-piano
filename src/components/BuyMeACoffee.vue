<template lang="pug">
.panel
  a(target='_blank' href='https://www.buymeacoffee.com/tosungo' id='buy-me-a-coffee')
    img(src='https://cdn.buymeacoffee.com/buttons/v2/default-orange.png' alt='Buy Me A Coffee' style="height: 40px")
</template>

<script>
import { inject, ref } from 'vue';
import PanelTemplate from './PanelTemplate.vue';

export default {
  name: 'BuyMeACoffee',
  components: {
    PanelTemplate,
  },
};
</script>
