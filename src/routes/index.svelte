<script lang="ts">
	import { BarGraph, BarItem } from '@src/component/bar-graph';
	let data: number[] = [1, 2, 3, 5, 8];
	let title: string = 'Hello World';
	let minV: number;
	let maxV: number;
</script>

<div class="root">
	<h1>Graph Component Example</h1>
	<div class="graph-field">
		<BarGraph {data} {title} bind:minV bind:maxV>
			{#each data as d}
				<BarItem min={minV} max={maxV} value={d} />
			{/each}
		</BarGraph>
	</div>
</div>

<style lang="scss">
	.root {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 32px;
		.graph-field {
			height: 600px;
		}
	}

	:global(body, html) {
		padding: 0;
		margin: 0;
	}
</style>
