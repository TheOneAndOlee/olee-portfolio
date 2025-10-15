
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
		RouteId(): "/" | "/About" | "/Contact" | "/Projects" | "/SteamProfile";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/About": Record<string, never>;
			"/Contact": Record<string, never>;
			"/Projects": Record<string, never>;
			"/SteamProfile": Record<string, never>
		};
		Pathname(): "/" | "/About" | "/About/" | "/Contact" | "/Contact/" | "/Projects" | "/Projects/" | "/SteamProfile" | "/SteamProfile/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/fonts/Atkinson-Hyperlegible-Next-Italic.woff2" | "/fonts/Atkinson-Hyperlegible-Next.woff2" | "/fonts/Geo-Italic.woff2" | "/fonts/Geo-Regular.woff2" | "/robots.txt" | string & {};
	}
}