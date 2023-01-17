<template>
<div id="deck" @dragover.prevent @dragenter.prevent @drop="onDrop($event)"></div>
</template>

<script>
export default {
  name: "UserDeck",
  data() {
    return {
      cards: 0,
    }
  },
  methods: {
    onDrop(event) {
      if(this.cards < 6){
        let cardID = event.dataTransfer.getData('cardID').split("-");
        let card = document.getElementById(cardID[0]+'-'+cardID[1]).cloneNode(true);
        card.id = cardID[0]+'-'+(parseInt(cardID[1])+1);
        document.getElementById('deck').appendChild(card)
        this.cards++
      }
    }
  }
}
</script>

<style lang="scss">
div#deck{
  display: flex;
  min-width: 600px;
  min-height: 100px;
  width: fit-content;
  margin: 20px auto;
  background-color: #2c3e50;
  div.card{
    border: 1px solid white;
    width: 80px;
  }
}
</style>