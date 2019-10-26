import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import api from "./api.js";
import runPlugins from "./plugins.js";
import main from "async-main";

main(async () => {
	const { PORT, NODE_ENV } = process.env;
	const dev = NODE_ENV === 'development';

	const plugins = ['plugin-bridge.js'];

//	await runPlugins(plugins);

	return new Promise(async (y, n) => {
		polka() // You can also use Express
			.use('/api', await api)
			.use(
				compression({ threshold: 0 }),
				sirv('static', { dev }),
				sapper.middleware()
			)
			.listen(PORT, err => {
				if (err) n(err);
			});
	});
});
