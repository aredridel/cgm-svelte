import resolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import svelte from 'rollup-plugin-svelte';
import globals from "rollup-plugin-node-globals";
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import json from "rollup-plugin-json";

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

const plugins = [
	'plugin-bridge.js'
];

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			json(),
			alias({
				entries: [
					{ find: '@app/db', replacement: 'src/clientdb.js' }
				]
			}),
			replace({
				values: {
					'process.browser': true,
					'process.env.NODE_ENV': JSON.stringify(mode)
				}
			}),
			builtins(),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				preferBuiltins: false,
				mainFields: ['module', 'jsnext:main', 'browser', 'main'],
				browser: true,
				dedupe
			}),
			commonjs(),
			globals(),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: {
			...config.server.input(), 
			'plugin-bridge': 'src/plugin-bridge.js',
		},
		output: config.server.output(),
		plugins: [
			json(),
			alias({
				entries: [
					{ find: '@app/db', replacement: 'src/serverdb.js' }
				]
			}),
			replace({
				values: {
					'process.browser': false,
					'process.env.NODE_ENV': JSON.stringify(mode)
				}
			}),
			svelte({
				generate: 'ssr',
				dev
			}),
			resolve({
			  preferBuiltins: true,
				mainFields: ['module', 'jsnext:main', 'main'],
				dedupe
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			json(),
			resolve(),
			replace({
				values: {
					'process.browser': true,
					'process.env.NODE_ENV': JSON.stringify(mode)
				}
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	},
};
