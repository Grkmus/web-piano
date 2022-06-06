<template lang='pug'>
Panel(name="About the Author")
  template(v-slot)
    q-icon(name='fab fa-github' size='xs')
    q-icon(name='fab fa-twitter' size='xs')
    q-icon(name='fab fa-instagram' size='sm')
    q-icon(name='fa fa-globe' size='xs')
</template>

<script>
import Panel from './Panel.vue';

export default {
  name: 'AboutAuthor',
  components: {
    Panel,
  },
};
</script>

<style>
</style>
