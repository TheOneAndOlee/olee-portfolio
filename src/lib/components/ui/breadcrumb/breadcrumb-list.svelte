<script lang="ts">
	import type { HTMLOlAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte"; // 1. Import getContext

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLOlAttributes> = $props();

	// 2. Get the textColor from the context
	const { textColor } = getContext<{ textColor?: string }>("breadcrumb");
</script>

<ol
	bind:this={ref}
	data-slot="breadcrumb-list"
	class={cn(
		"text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-2xl sm:gap-2.5",
		className
	)}
	style:color={textColor} {...restProps}
>
	{@render children?.()}
</ol>