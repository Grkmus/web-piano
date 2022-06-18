<template lang="pug">
#about
  label About The Author
  #icon-container
    a(target='_blank' href='https://github.com/Grkmus')
      font-awesome-icon(:icon="['fab', 'github']")
    a(target='_blank' href='https://twitter.com/tosungo')
      font-awesome-icon(:icon="['fab', 'twitter']")
    a(target='_blank' href='https://www.instagram.com/tosungo/')
      font-awesome-icon(:icon="['fab', 'instagram']")
    a(target='_blank' href='https://gorkemtosun.com/')
      font-awesome-icon(:icon="['fa', 'globe']")
</template>

<script>
export default {
  name: 'AboutAuthor',
};
</script>

<style>
#icon-container {
  display: flex;
}
</style>