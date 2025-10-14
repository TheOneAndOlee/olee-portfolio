<script lang="ts">
	import type { WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { setContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		textColor, // 1. Add textColor prop
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & { textColor?: string } = $props();

	// 2. Set the color in the context for child components to use
	setContext("breadcrumb", {
		textColor
	});
</script>

<nav
	bind:this={ref}
	data-slot="breadcrumb"
	class={className}
	aria-label="breadcrumb"
	{...restProps}
>
	{@render children?.()}
</nav>