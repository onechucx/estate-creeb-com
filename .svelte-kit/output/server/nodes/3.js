

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/dashboard/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BPRD35lt.js","_app/immutable/chunks/0iOe7Ifd.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];
