<template>
  <h2>Rechercher des Pokémons</h2>
  <div class="search">
    <input
        type="text" placeholder="Recherche..."
        ref="input"
        v-model="inputValue">
    <select name="types" id="types" @change="getList()" v-model="filter">
      <option value="default">Tout type</option>
      <option value="water">Eau</option>
    </select>
  </div>
  <div class="results">
      <poke-card
          v-for="(pokemon, index) in filteredPokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          :index="index"
          :typeColor="typeColor"
          draggable="true"
      />
  </div>
</template>

<script>
import pokeCard from "@/components/PokeCard";
export default {
  name: "SearchPokemon",

  data() {
    return{
      inputValue: "",
      pokeNames: [],
      filter: 'default',
      typeColor: {
        "normal": "#F5F5DC",
        "fire": "#F08030",
        "water": "#87CEEB",
        "electric": "#F8D030",
        "grass": "#90EE90",
        "ice": "#E0FFFF",
        "fighting": "#F08080",
        "poison": "#9370DB",
        "ground": "#D2B48C",
        "flying": "#E6E6FA",
        "psychic": "#FF69B4",
        "bug": "#90EE90",
        "rock": "#B0C4DE",
        "ghost": "#9370DB",
        "dragon": "#9932CC",
        "dark": "#A9A9A9",
        "steel": "#B0C4DE",
        "fairy": "#FFB6C1"
      },
    }
  },

  components: {
    pokeCard,
  },

  methods: {                                                                             /*METHODS*/
    //get API data ---------------------------------------------------------------------------------
    getData(url){
      return fetch(url).then(response => response.json()).then(data => data)
    },
    getList(){
      if(this.filter === 'default'){
        this.getData('https://pokeapi.co/api/v2/pokemon?limit=2000').then(data => {
          this.pokeNames = data["results"];
        })
      }else{
        this.getData('https://pokeapi.co/api/v2/type/'+this.filter).then(data => {
          this.pokeNames = data["pokemon"];
          console.log(this.pokeNames)
        })
      }
    }
  },

  computed: {                                                                           /*COMPUTED*/
    //filter name list -----------------------------------------------------------------------------
    filteredPokemons(){
      return this.pokeNames.filter((pokemon) => {
        return pokemon.name.includes(this.inputValue.toLowerCase().replaceAll(' ', '-'))
      }).slice(0,10)
    }
  },


                                                                                            /*INIT*/
  // -----------------------------------------------------------------------------------------------
  created() {
    this.getList()
  },
  mounted() {
    this.$refs.input.focus()
  },

}
</script>

<style scoped lang="scss">
div.search{
  width: fit-content;
  margin: 40px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  input{
    box-sizing: border-box;
    border: none;
    padding-left: 10px;
    &:focus{
      outline: 0;
    }
  }
  select{
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    box-sizing: border-box;
    padding: 10px 20px;
    background-color: #42b983;
    font-weight: bold;
    color: white;
    &:hover{
      cursor: pointer;
    }
    &:focus{
      outline: 0;
    }
  }
}
div.results{
  display: grid;
  gap: 10px;
  max-width: 800px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  div.card{
    border-width: 5px;
    border-style: solid;
  }
}
</style>