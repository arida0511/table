<script lang="ts">
	import { onMount } from 'svelte';

	export let data: number[];
	export let title: string;
	export let guideCount: number = 5;
	export let minV: number;
	export let maxV: number;

	minV = Math.min(...data);
	maxV = Math.max(...data);
	const range = maxV - minV;
	const diff = range / guideCount;

	const leftGuides: number[] = [];
	for (let i = 0; i < guideCount; i++) {
		leftGuides.push(minV + i * diff);
	}
	let clientWidth: number;
	let clientHeight: number;
	let ele: SVGElement | undefined = undefined;
	let enable: boolean = false;

	console.log({ ele });

	onMount(() => {
		console.log('mount');
		console.log({ ele });
		if (ele) {
			clientWidth = ele.clientWidth;
			clientHeight = ele.clientHeight;
			enable = true;
		}
	});
</script>

<svg class="root" bind:this={ele}>
	<g data-name="title">
		<rect x={0} y="0" width={clientWidth} height="100px" />
		<text x={clientWidth / 2} y="50px" text-anchor="middle" alignment-baseline="middle"
			>{title}</text
		>
	</g>
	<g data-name="l-guide">
		{#each leftGuides as v}
			<line
				x1="50px"
				y1={((clientHeight - 100) / leftGuides.length) * v + 100}
				x2="150px"
				y2={((clientHeight - 100) / leftGuides.length) * v + 100}
			/>
		{/each}
	</g>
</svg>

<style lang="scss">
	.root {
		width: 100%;
		height: 100%;
		line {
			stroke: #000;
			stroke-width: 2px;
		}
	}
</style>
