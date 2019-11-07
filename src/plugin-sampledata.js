setInterval(() => {
	global.postMessage({
		type: 'sgv',
		content: {
			ts: Date.now(),
			sgv: Math.floor(Math.random() * 100 + 100)
		}
	});
}, 15000);
