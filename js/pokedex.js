$(document).ready(function(){   
    
    document.getElementById('addPokemon').classList.add('hidden');

    // Comprobar si el valor de mostrar en local storage es 1
    var cerrarModalStatus = localStorage.getItem("cerrarModal");
    if(cerrarModalStatus != 1) {
        $('#myModal').modal('show');
    }

    // Carga un set inicial de pokemons
    anadirPokemon();

    // Le añade funcionalidad al botón
    let boton = document.querySelector('#addPokemon')
    boton.addEventListener("click", anadirPokemon)
});

// Variable para almacenar el numero de pokemons mostrados (global)
var last = 0;

function anadirPokemon(e){
    if(last<900){
        let URL = "https://pokeapi.co/api/v2/pokemon?offset="+last+"&limit=52";

        last = last + 52;

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
                        pokemonrequest[i].open("GET", pokemon['url'], false);
        
                        pokemonrequest[i].onreadystatechange = function(){
                            if (pokemonrequest[i].readyState === 4 && pokemonrequest[i].status === 200){
                                let pokemondata = JSON.parse(pokemonrequest[i].responseText);
                                
                                var pokemonName = pokemondata.species.name;
                                var pokemonImage = pokemondata.sprites.front_default;
                                var pokemonId = pokemondata.id;
                                
                                if(pokemonId<10000){

                                    // Crear los div's y ponerles el nombre y la imagen
                                    var pokeCard = document.createElement("div");
                                    pokeCard.classList.add('col-lg-3');
                                    pokeCard.classList.add('col-md-4');
                                    pokeCard.classList.add('col-sm-6');
                                    pokeCard.classList.add('col-6');

                                    // Pokeball div
                                    var pokeballCard = document.createElement("div");
                                    pokeballCard.classList.add('pokeball-wrapper');
                                    var pokeball = document.createElement("img");
                                    pokeball.src = './images/pokeball.png';
                                    pokeballCard.appendChild(pokeball);
                                    pokeCard.appendChild(pokeballCard);

                                    // Pokemon div
                                    var pokemonCard = document.createElement("div");
                                    pokemonCard.classList.add('enhanced');

                                    // Pokemon div -> h2
                                    var pokemonNameCard = document.createElement("h2");
                                    pokemonNameCard.classList.add('text-center');
                                    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
                                    var pokemonNameContent = document.createTextNode(pokemonName);
                                    pokemonNameCard.appendChild(pokemonNameContent);
                                    pokemonCard.appendChild(pokemonNameCard);

                                    // Pokemon div -> img
                                    var pokemonLink = document.createElement("a");
                                    pokemonLink.href = "https://www.pokemon.com/es/pokedex/" + pokemonId;

                                    var pokemonImgCard = document.createElement("img");
                                    pokemonImgCard.classList.add('pokemon', 'medium');
                                    pokemonImgCard.src = pokemonImage;

                                    pokemonLink.appendChild(pokemonImgCard)
                                    pokemonCard.appendChild(pokemonLink);

                                    for(const type of pokemondata.types) {
                                        var typeImg = document.createElement("img");
                                        typeImg.classList.add('pokemon', 'medium');
                                        typeImg.src = "./images/types/" + type.type.name + ".svg";
                                        typeImg.id = "typeImg";
                                        pokemonCard.appendChild(typeImg);
                                    }
                                    
                                    // Ahora que tiene todo lo que necesita, metemos el div al container
                                    pokeCard.appendChild(pokemonCard);

                                    // Todo OK, añadir al body
                                    pokedex.appendChild(pokeCard)
                                    document.getElementById('addPokemon').classList.remove('hidden');
                                }
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

        document.getElementById('cerrarModal').onclick = function() {
            localStorage.setItem("cerrarModal", 1);
        }

        xhr.send();
    }
    if(last>898){
        $('#addPokemon').prop('disabled', true);
    }

}