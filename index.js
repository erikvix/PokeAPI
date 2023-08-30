const url = "https://pokeapi.co/api/v2/pokemon/";

const pokemonhtml = document.querySelector("#pokemon");

function GetPokemon(url, nome) {
  axios
    .get(url + nome)
    .then((response) => {
      const pokemon = response.data;

      pokemonhtml.innerHTML = "pokemon";
    })
    .catch((error) => console.log(error));
}

let nome1 = "pikachu";

GetPokemon(url, nome1);
