const worker =  require('worker_threads');

setInterval(() => {
	worker.parentPort.postMessage({
		type: 'sgv',
		content: {
			_t: Date.now(),
			sgv: Math.floor(Math.random() * 100 + 100)
		}
	});
}, 30000);
