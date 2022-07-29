<script lang="ts">
	import { BarGraph, BarItem } from '@src/component/bar-graph';
	import { BarGraphSVG, BarItemSVG } from '@src/component/bar-graph-svg';
	let data: number[] = [1, 2, 3, 5, 8];
	let title: string = 'Hello World';
	let minV: number;
	let maxV: number;
</script>

<div class="root">
	<BarGraph {data} {title} bind:minV bind:maxV>
		{#each data as d}
			<BarItem min={minV} max={maxV} value={d} />
		{/each}
	</BarGraph>
</div>

<style lang="scss">
	rect {
		fill: #f00;
	}
	circle {
		fill: none;
		stroke: #f0f;
		stroke-dasharray: 3, 3;
		stroke-width: 3px;
		stroke-dashoffset: 1;
		animation: anim 10s;
	}
	svg {
		width: 100%;
		height: 100%;
	}
	.root {
		background: #fff;
		height: 80vh;
		border: solid 2px #000;
		position: relative;
		.parent {
			background: #00f;
			width: 100%;
			height: 100%;
			.test1 {
				width: 100px;
				height: 100px;
				background: #000;
			}
		}
	}
</style>
