

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/dashboard/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.B6F7mLTk.js","_app/immutable/chunks/scheduler.BjL_aqLc.js","_app/immutable/chunks/index.CX86xIsQ.js","_app/immutable/chunks/stores.93zrsl6M.js","_app/immutable/chunks/index.COHAQAyh.js"];
export const stylesheets = [];
export const fonts = [];
