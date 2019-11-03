const worker =  require('worker_threads');

setInterval(() => {
	worker.parentPort.postMessage({
		type: 'sgv',
		content: {
			ts: Date.now(),
			sgv: Math.floor(Math.random() * 100 + 100)
		}
	});
}, 15000);
