import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import api from "./api.js";
import runPlugins from "./plugins.js";
import main from "async-main";
import dbP from "@@app/db";
import pino from "express-pino-logger";


main(async () => {
    const { PORT, NODE_ENV } = process.env;
    const dev = NODE_ENV === 'development';

    const plugins = ['plugin-bridge.js'];

    await runPlugins(plugins);

    const db = await dbP;
    const { app: dbserver } = db.server({
		startServer: false
    });

    return new Promise(async (y, n) => {
		express()
			.use(pino())
			.use('/db', dbserver)
	//		.use('/api', await api)
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
