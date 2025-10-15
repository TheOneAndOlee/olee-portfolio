<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte"; // 1. Import getContext

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();

	// 2. Get the textColor from the context
	const { textColor } = getContext<{ textColor?: string }>("breadcrumb");
</script>

<span
	bind:this={ref}
	data-slot="breadcrumb-page"
	role="link"
	aria-disabled="true"
	aria-current="page"
	class={cn("text-foreground font-normal", className)}
	style:color={textColor} {...restProps}
>
	{@render children?.()}
</span>