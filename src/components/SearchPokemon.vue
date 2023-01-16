<template>
  <h2>Rechercher des Pokémons</h2>
  <div class="search">
    <input
        type="text" placeholder="Recherche..."
        ref="input"
        v-model="this.inputValue"
        @keyup="getResults">
    <button>Go</button>
  </div>
  <div class="results">
    <div class="card" v-for="pokemon in pokeResults" :key="pokemon.name">
      <section>
        <h2>{{pokemon.name}} <span>{{pokemon.id}}</span></h2>
      </section>
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPokemon",
  data() {
    return {
      inputValue: '',
      filter: 'default',
      pokeResults: [
      ],
      pokeSearchList : {
        type: "",
        list: []
      }
    }
  },
  methods: {
    getData(url){
      return fetch(url).then(response => response.json()).then(data => data);
    },
    getPokemonData(nameOrID){
      return this.getData("https://pokeapi.co/api/v2/pokemon/"+nameOrID).then(data=>data);
    },
    getPokeList(){
      this.pokeResults = [];
      if(this.filter==='default'){
        //récupérer les 20 premiers pokémons
        if(this.pokeSearchList.type !== 'default'){
          this.getData("https://pokeapi.co/api/v2/pokemon/").then(data => {
            data["results"].forEach(pokemon => {
              this.pokeSearchList.list.push(pokemon.name);
            })
            this.getResults()
          })
          this.pokeSearchList.type = "default"
        }
      }
    },
    getResults(){
      this.pokeResults = []
      this.pokeSearchList.list.forEach(pokeName => {
        if(this.inputValue === "" || pokeName.includes(this.inputValue)){
          this.getPokemonData(pokeName).then(pokemon => {
            this.pokeResults.push(pokemon)
          })
        }
      })
    }
  },
  mounted() {
    this.$refs.input.focus()
    this.getPokeList()
  }
}
</script>

<style scoped lang="scss">
input{
  border-style: solid;
  border-color: #2c3e50;
  border-width: 1px 0 1px 1px;
  padding: 10px;
  border-radius: 25px 0 0 25px;
  &:focus{
     outline: 0;
   }
}
button{
  border-width: 1px 1px 1px 0;
  padding: 10px;
  border-radius: 0 25px 25px 0;
  border-style: solid;
  border-color: #2c3e50;
  background-color: #42b983;
  font-weight: bold;
  color: white;
  &:hover{
    cursor: pointer;
  }
}
div.results{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
</style>