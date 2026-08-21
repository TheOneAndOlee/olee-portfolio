// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module '*.MOV' {
		const src: string;
		export default src;
	}

	declare module '*.mp4' {
		const src: string;
		export default src;
	}
}

export {};
