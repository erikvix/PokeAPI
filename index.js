const pokemonhtml = document.querySelector("#pokemon");
const pokemonphoto = document.querySelector("#pokefoto");
const pokemonform = document.querySelector("#pokeform");
var pokeName, pokemon, card;
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const input = document.querySelector("#input");
const pesquisabtn = document.querySelector("#pesquisabtn");

function displayPokemonInfo(data) {
  console.log(data);
  pokemonhtml.innerHTML = data.name;
  pokemonphoto.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
  pokemonform.src = data.sprites.other['official-artwork'].front_default;
  console.log("ID: " + data.id);
  console.log("Nome: " + data.name);
  console.log("Altura: " + data.height);
  console.log("Peso: " + data.weight);
}

function requestPokeInfo(url, name) {
  axios
    .get(url + name)
    .then((response) => {
      pokemon = response.data;
      displayPokemonInfo(pokemon);
    })
    .catch((err) => console.log(err));
}

pesquisabtn.addEventListener("click", function (e) {
  pokeName = input.value.toLowerCase();
  requestPokeInfo(baseUrl, pokeName);
});
