<template lang='pug'>
.card
  .card-title {{ title }}
  .card-content
    slot

</template>

<script>

export default {
  props: {
    title: null,
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  min-height: 95%;
  padding: 10px;
  margin: 10px;
}

.card-title {
  font-size: 0.8em;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-content {
    font-size: 0.75em;
    /* line-height: 1.5; */
}
</style>