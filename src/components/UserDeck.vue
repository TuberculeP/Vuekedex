<template>
<div id="deck">
  <div class="cell" v-for="i in 6" :key="i"></div>
</div>
</template>

<script>
export default {
  name: "UserDeck",
}
</script>

<style scoped lang="scss">
div#deck{
  display: flex;
  width: fit-content;
  margin: 20px auto;
  div.cell{
    margin: 5px;
    width: 80px;
    height: 80px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.25);
  }
}
</style>