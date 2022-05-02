function initMap() {

	map = new google.maps.Map(document.getElementById("map"), {
	  center: { lat: 40.416, lng: -3.703 },
	  zoom: 6,
	});
	infoWindow = new google.maps.InfoWindow();
  
	const locationButton = document.createElement("button");
  
	locationButton.textContent = "Ir a mi ubicación";
	locationButton.classList.add("custom-map-control-button");
	map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
	locationButton.addEventListener("click", () => {
	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
		  (position) => {
			const pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude,
			};
  
			infoWindow.setPosition(pos);
			infoWindow.setContent("¡Estás aquí!");
			infoWindow.open(map);
			map.setCenter(pos);
			map.setZoom(18);
		  },
		  () => {
			handleLocationError(true, infoWindow, map.getCenter());
		  }
		);
	  } else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	  }
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
		? "Error: No se ha podido acceder a tu geoposición."
		: "Error: Tu navegador no soporta el geolocalizdor."
	);
	infoWindow.open(map);
}

// Browser doesn't support Geolocation
function errorUbicacion() {
    let btn = document.getElementById('compartirUbicacion');
    btn.classList.add('disabled');
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    btn.title = "No se puede acceder a tu ubicación.";
    $('[data-toggle="tooltip"]').tooltip();
}

$(document).ready(function(){
    let map, infoWindow;

	window.initMap = initMap;

    document.getElementById('compartirUbicacion').onclick = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
                (position) => {
                    let mensaje = "Mi ubicación es: " + position.coords.latitude + " (lat), " + position.coords.longitude + " (long).";
                
                    if (navigator.share) {
                        navigator.share({
                            title: 'Estoy aquí',
                            text: mensaje,
                            url: 'https://nicolasmeseguer.github.io',
                        })
                        .then(() => {
                            btn.classList.remove('btn-primary');
                            btn.classList.add('btn-success');
                            })
                        .catch((error) => console.log('Error compartiendo.', error));
                    } else {
                        errorUbicacion();
                    }
                },
                () => {
                    errorUbicacion();
                }
              );
		} else {
			errorUbicacion();
		}
	}
});