// First, we tell our webapp that we have a service-worker
// Notice how we test our browser if 'serviceWorkers' are 
// supported. If not, our web app should behave as a regular web 
$(document).ready(function(){

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('service-worker.js');
	}

	window.addEventListener('offline', () => {
		$('.offline').show();
		$('#online-container').hide();
		$('#offline-container').show();
		$('#addPokemon').hide();
		$('#compartirUbicacion').addClass('disabled')
		$('#compartirUbicacion').attr('title', "No tienes conexión a internet.");
 		$('[data-toggle="tooltip"]').tooltip();
		$('.pokemonanyadir').attr('disabled',true);
	});
	
	window.addEventListener('online', () => {
		$('.offline').hide();
		$('#online-container').show();
		$('#offline-container').hide();
		$('#addPokemon').show();
		$('#compartirUbicacion').removeClass('disabled');
		$('[data-toggle="tooltip"]').tooltip("destroy");
		$('.pokemonanyadir').attr('disabled',false);

		var pathname = window.location.pathname;
		if(pathname.indexOf("pokedex.html") >= 0 || pathname.indexOf("raid.html") >= 0)
			location.reload()
	});
	
	navigator.getBattery().then(battery => {
	
		const c = battery.level * 100;
		var cerrarModalBatteryStatus = sessionStorage.getItem("cerrarModalBattery");

		// Print the modal
		if(c <= 30 && cerrarModalBatteryStatus != 1) {
			$('#batteryModal').modal('show');
		}
	
	});

	document.getElementById('cerrarBatteryModal').onclick = function() {
		sessionStorage.setItem("cerrarModalBattery", 1);
	}

	if(!window.navigator.onLine){
		$('.offline').show();
		$('#online-container').hide();
		$('#offline-container').show();
		$('#addPokemon').hide();
		$('.pokemonanyadir').attr('disabled',true);
	}

});
