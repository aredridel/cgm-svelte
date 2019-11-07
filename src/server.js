import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import api from "./api.js";
import runPlugins from "./plugins.js";
import main from "async-main";
import db from "@@app/db";
import pino from "express-pino-logger";
import mainLogger from "./logger.js";

const logger = mainLogger.child({area: 'server'});

main(async () => {
    const { PORT, NODE_ENV, PLUGINS } = process.env;
    const dev = NODE_ENV === 'development';

    const plugins = (PLUGINS || "").split(" ").filter(Boolean);

    await runPlugins(plugins);

    const { app: dbserver } = (await db).server({
		startServer: false
    });

    return new Promise(async (y, n) => {
		express()
			.use(pino({ logger }))
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
