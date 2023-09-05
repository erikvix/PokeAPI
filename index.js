const pokemonhtml = document.querySelector("#pokemon");
const pokemonphoto = document.querySelector("#pokefoto");
const pokemonform = document.querySelector("#pokeform");
const pokemonweight = document.querySelector("#pokepeso");
const pokemonheight = document.querySelector("#pokealtura");
const pokemonid = document.querySelector("#pokeid")
const type = document.querySelector("#poketipo")
var pokeName, pokemon, card;
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const input = document.querySelector("#input");
const pesquisabtn = document.querySelector("#pesquisabtn");

function displayPokemonInfo(data) {
  console.log(data);
  pokemonid.innerHTML = `#${data.id}`
  pokemonhtml.innerHTML = data.name;
  pokemonheight.innerHTML = `Altura: ${data.height}m`
  pokemonweight.innerHTML = `Peso: ${data.weight}kg`
  data.types.forEach((type, index) => {

    const poketype = document.createElement("p");

    poketype.textContent = `Tipo: ${type.type.name}`;
    poketype.classList.add("element")
    
    const pokemonhtml = document.querySelector(".type-list");
    pokemonhtml.appendChild(poketype);
});
  pokemonphoto.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
  pokemonform.src = data.sprites.other['official-artwork'].front_default;
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
  const box = document.querySelector(".pokemon-box");

  box.classList.remove("display-off")
  pokeName = input.value.toLowerCase();
  requestPokeInfo(baseUrl, pokeName);
});
