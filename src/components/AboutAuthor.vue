<template lang="pug">
#about
  h1(:style="{'margin-top': '0px'}")
    a(href='/') Web Piano
  label About The Author
  #icon-container
    a(target='_blank' href='https://github.com/Grkmus')
      font-awesome-icon(:icon="['fab', 'github']" size='2x')
    a(target='_blank' href='https://twitter.com/tosungo')
      font-awesome-icon(:icon="['fab', 'twitter']" size='2x')
    a(target='_blank' href='https://www.instagram.com/tosungo/')
      font-awesome-icon(:icon="['fab', 'instagram']" size='2x')
    a(target='_blank' href='https://gorkemtosun.com/')
      font-awesome-icon(:icon="['fa', 'globe']" size='2x')
</template>

<script>
export default {
  name: 'AboutAuthor',
};
</script>

<style></style>
