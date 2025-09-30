export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [4],
		"/(app)/admin-panel": [5,[2]],
		"/(app)/community": [6,[2]],
		"/(app)/dashboard": [7,[2]],
		"/(app)/estate-management": [8,[2]],
		"/(app)/inbox": [9,[2]],
		"/(app)/marketplace": [10,[2]],
		"/(app)/my-listings": [11,[2]],
		"/(app)/profile": [12,[2]],
		"/(app)/settings": [13,[2]],
		"/(app)/support": [14,[2]],
		"/test": [17,[3]],
		"/(app)/vendor/[name]": [15,[2]],
		"/(app)/wallets": [16,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.svelte';