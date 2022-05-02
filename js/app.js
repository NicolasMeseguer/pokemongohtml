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
		let btn = document.getElementById('compartirUbicacion');
		btn.classList.add('disabled');
		btn.title = "No tienes conexión a internet.";
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	window.addEventListener('online', () => {
		location.reload();
	});
	
	navigator.getBattery().then(battery => {
	
		const c = battery.level * 100;
		var cerrarModalBatteryStatus = localStorage.getItem("cerrarModalBattery");

		// Print the modal
		if(c <= 30 && cerrarModalBatteryStatus != 1) {
			$('#batteryModal').modal('show');
		}
		else if(c > 50) {
			localStorage.removeItem("cerrarModalBattery");
		}
	
	});

	document.getElementById('cerrarBatteryModal').onclick = function() {
		localStorage.setItem("cerrarModalBattery", 1);
	}

	if(!window.navigator.onLine){
		$('.offline').show();
		$('#online-container').hide();
		$('#offline-container').show();
		$('#addPokemon').hide();
	}

});
