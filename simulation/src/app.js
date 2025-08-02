if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Millikans_Oil_Drop_Experiment/service_worker_Millikans_Oil_Drop_Experiment.js')
		.then(function(r) {
			console.log('NW  App now available offline');
		})
		.catch(function(e) {
			console.log('NW App NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
