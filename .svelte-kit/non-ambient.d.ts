
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(app)" | "/" | "/(app)/admin-panel" | "/(app)/community" | "/(app)/dashboard" | "/(app)/estate-management" | "/favicon.ico" | "/(app)/inbox" | "/(app)/marketplace" | "/(app)/my-listings" | "/(app)/profile" | "/(app)/settings" | "/(app)/support" | "/test" | "/(app)/vendor" | "/(app)/vendor/[name]" | "/(app)/wallets";
		RouteParams(): {
			"/(app)/vendor/[name]": { name: string }
		};
		LayoutParams(): {
			"/(app)": { name?: string };
			"/": { name?: string };
			"/(app)/admin-panel": Record<string, never>;
			"/(app)/community": Record<string, never>;
			"/(app)/dashboard": Record<string, never>;
			"/(app)/estate-management": Record<string, never>;
			"/favicon.ico": Record<string, never>;
			"/(app)/inbox": Record<string, never>;
			"/(app)/marketplace": Record<string, never>;
			"/(app)/my-listings": Record<string, never>;
			"/(app)/profile": Record<string, never>;
			"/(app)/settings": Record<string, never>;
			"/(app)/support": Record<string, never>;
			"/test": Record<string, never>;
			"/(app)/vendor": { name?: string };
			"/(app)/vendor/[name]": { name: string };
			"/(app)/wallets": Record<string, never>
		};
		Pathname(): "/" | "/admin-panel" | "/admin-panel/" | "/community" | "/community/" | "/dashboard" | "/dashboard/" | "/estate-management" | "/estate-management/" | "/favicon.ico" | "/favicon.ico/" | "/inbox" | "/inbox/" | "/marketplace" | "/marketplace/" | "/my-listings" | "/my-listings/" | "/profile" | "/profile/" | "/settings" | "/settings/" | "/support" | "/support/" | "/test" | "/test/" | "/vendor" | "/vendor/" | `/vendor/${string}` & {} | `/vendor/${string}/` & {} | "/wallets" | "/wallets/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/placeholder.svg" | string & {};
	}
}