// First, we tell our webapp that we have a service-worker
// Notice how we test our browser if 'serviceWorkers' are 
// supported. If not, our web app should behave as a regular web 
$(document).ready(function(){
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('service-worker.js');
	}
	
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
	}
});

window.addEventListener('offline', () => {
	$('.offline').show();
});

window.addEventListener('online', () => {
	$('.offline').hide();
});