$(document).ready(function () {
  
    for (let i = 1; i < 7; i++) {
        let pokemonInfo = localStorage.getItem("pokemonteam"+i)
        if (pokemonInfo != null) {
            let pokemonHtml = document.querySelectorAll('.equipo-div')[i-1];
            let pokemonJSON = JSON.parse(pokemonInfo);
            pokemonHtml.getElementsByTagName('img')[0].src = pokemonJSON['img'];
            pokemonHtml.getElementsByTagName('h2')[0].innerHTML = pokemonJSON['name'];
            pokemonHtml.querySelector('.pokemonanyadir').classList.add("hidden");
            pokemonHtml.querySelector('.pokemonquitar').classList.remove("hidden");
        }
    }

});

let botonAdd = document.querySelectorAll('.pokemonanyadir').forEach(button => {
    button.addEventListener('click', añadirPokemon);
});
let botonRemove = document.querySelectorAll('.pokemonquitar').forEach(button => {
    button.addEventListener('click', eliminarPokemon);
});

function añadirPokemon(e) {
  // Abrir modal
  $('#myModal').modal('show');
  document.getElementById('pokemonName').value = "";

  document.getElementById('equipoBuscarPokemon').onclick = function() {
    var pokemonName = document.getElementById('pokemonName').value;
    // Intenta buscar
    if(pokemonName.length >= 3) {
        let URL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase();

        // Llamar a la api.
        let xhr = new XMLHttpRequest();
        xhr.open("GET", URL, false);

        xhr.onreadystatechange = function(){
          if(xhr.readyState === 4 && xhr.status === 200){
            // JSON
            let pokemondata = JSON.parse(xhr.responseText);

            // Cargar datos
            var pokemonNameCorrect = pokemondata.name.charAt(0).toUpperCase() + pokemondata.name.slice(1);
            var pokemonId = pokemondata.id;
            var pokemonImage = pokemondata.sprites.front_default;

            e.target.parentElement.firstChild.nextSibling.innerHTML = pokemonNameCorrect;
            e.target.parentElement.querySelector('.pokemon').src = pokemonImage;

            // Guardar en Local Storage
            let pos = e.target.parentElement.firstChild.nextSibling.nextSibling.nextSibling.value;
            let json_storage = {
              "name": pokemonNameCorrect,
              "img": pokemonImage
            }
            localStorage.setItem("pokemonteam" + pos, JSON.stringify(json_storage));

            // Intermcabiar visibilida de los botones.
            e.target.classList.add("hidden");
            e.target.parentElement.querySelector('.pokemonquitar').classList.remove("hidden");
          } else {
            alert("El pokemon '" + pokemonName + "' no existe.");
          }
        };

        xhr.send();
    }
    else
      alert("El nombre es demasiado corto");
  }
}

function eliminarPokemon(e) {
    // Actualizar imagen
    e.target.parentElement.querySelector('.pokemon').src = "./images/no-pokemon.png";
    let pos_x = e.target.parentElement.firstChild.nextSibling.nextSibling.nextSibling.value;
    e.target.parentElement.firstChild.nextSibling.innerHTML = "Pokemon " + pos_x;

    // Borrar el local storage
    localStorage.removeItem("pokemonteam" + pos_x);
    
    // Intercambiar visibilidad de los botones cuando el pokemon se ha cargado.
    e.target.classList.add("hidden");
    e.target.parentElement.querySelector('.pokemonanyadir').classList.remove("hidden");
}

