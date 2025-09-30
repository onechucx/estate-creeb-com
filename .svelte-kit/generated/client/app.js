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
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/(app)/admin-panel": [4,[2]],
		"/(app)/community": [5,[2]],
		"/(app)/dashboard": [6,[2]],
		"/(app)/estate-management": [7,[2]],
		"/(app)/inbox": [8,[2]],
		"/(app)/marketplace": [9,[2]],
		"/(app)/my-listings": [10,[2]],
		"/(app)/profile": [11,[2]],
		"/(app)/settings": [12,[2]],
		"/(app)/support": [13,[2]],
		"/(app)/vendor/[name]": [14,[2]],
		"/(app)/wallets": [15,[2]]
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