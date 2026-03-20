
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
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/about" | "/projects" | "/projects/[slug]" | "/resume" | "/socials";
		RouteParams(): {
			"/projects/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/projects": { slug?: string };
			"/projects/[slug]": { slug: string };
			"/resume": Record<string, never>;
			"/socials": Record<string, never>
		};
		Pathname(): "/" | "/about" | `/projects/${string}` & {} | "/resume" | "/socials";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/colors.json" | "/fonts/Atkinson-Hyperlegible-Next-Italic.woff2" | "/fonts/Atkinson-Hyperlegible-Next.woff2" | "/logos/README.md" | "/README.md" | "/resume.pdf" | "/robots.txt" | string & {};
	}
}