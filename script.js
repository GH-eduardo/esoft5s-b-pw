
let params = new URLSearchParams(document.location.search);
let pokemon = params.get("name");

document.title = "Página do " + pokemon;

(async () => {
    const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + pokemon
    ).then(response => response.json());

    document.querySelector(
        '#informacoes'
    ).textContent = 'Informacoes sobre o ' + pokemon;

    document.querySelector('#pokemon-img').src = response.sprites.front_default;
})();