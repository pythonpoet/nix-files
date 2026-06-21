export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "calendar/_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DreXetYq.js",app:"_app/immutable/entry/app.CAoy_gdr.js",imports:["_app/immutable/entry/start.DreXetYq.js","_app/immutable/chunks/D46sI-Ra.js","_app/immutable/chunks/BCBOxtR6.js","_app/immutable/chunks/CrNCVdX_.js","_app/immutable/entry/app.CAoy_gdr.js","_app/immutable/chunks/BCBOxtR6.js","_app/immutable/chunks/kNaey6uv.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
