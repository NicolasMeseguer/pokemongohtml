$(document).ready(function(){
    let URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1";

    let pokedex = document.querySelector('#pokedex');

    let xhr = new XMLHttpRequest();
    var pokemonrequest = [];
    var i = 0;

    xhr.open("GET", URL);

    xhr.onload = function() {
        if(xhr.status == 200) {
            let pokemons = JSON.parse(xhr.responseText)

            for(const pokemon of pokemons.results) {
                (function(i) {
                    pokemonrequest[i] = new XMLHttpRequest();
                    pokemonrequest[i].open("GET", pokemon['url'], true);
    
                    pokemonrequest[i].onreadystatechange = function(){
                        if (pokemonrequest[i].readyState === 4 && pokemonrequest[i].status === 200){
                            let pokemondata = JSON.parse(pokemonrequest[i].responseText);
                            
                            var pokemonName = pokemondata.name;
                            var pokemonImage = pokemondata.sprites.front_default;

                            // Iterable
                            var pokemonType = pokemondata.types;
                        }
                    };
    
                    pokemonrequest[i].send();
        
                })(i);
                i++;
            }

        }
        else
            console.log("Error en la comunicación con la API, STATUS NOT 200");

    }
    xhr.onerror = function() {
        console.log("Error en la comunicación con la API");
    }

    xhr.send();
});