<template>
<div class="card" :id="'card-'+index">
  <h3>{{ nameFormat(pokemon.name) }}</h3>
  <img src="#" alt="#" draggable="false">
</div>
</template>

<script>
export default {
  name: "PokeCard",
  props: [
      'pokemon',
      'index',
      'typeColor'
  ],
  methods: {
    getData(url){
      return fetch(url).then(response => response.json()).then(data => data)
    },
    getPokemonData(pokemon){
      return this.getData("https://pokeapi.co/api/v2/pokemon/"+pokemon).then(data => data)
    },
    nameFormat(string){
      let array = string.split('-');
      let first = array[0].charAt(0).toUpperCase() + array[0].slice(1);
      if(array.length === 1){
        return first
      }else{
        return first+' ('+array.slice(1).join(' ')+')'
      }
    }
  },
  created() {
    this.getPokemonData(this.pokemon.name).then(data => {
      let card = document.getElementById('card-'+this.index)
      card.style.borderColor = this.typeColor[data['types'][0]['type']['name']]
      card.querySelector('img').src = data['sprites']['front_default']
    })
  }
}
</script>

<style scoped lang="scss">
div.card{
  width: 150px;
  box-sizing: border-box;
  position: relative;
  background-color: white;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: transform 200ms, box-shadow 200ms;
  &:hover{
    transform: translate(-10px, -10px);
    box-shadow: 10px 10px 0 black;
    cursor: pointer;
  }
  img{
    width: 70px;
  }
  h3{
    margin: 0;
  }
}
</style>