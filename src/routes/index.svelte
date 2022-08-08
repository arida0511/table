<script lang="ts">
	import { BarGraph, BarItem } from '@src/component/bar-graph';
import { update } from 'lodash';
	import {onMount, onDestroy} from 'svelte';
	import {updateData ,priceData, type PriceUnit} from '../store/index';
	let data: number[] = [1, 2, 3, 5, 8];
	let title: string = 'Hello World';
	let minV: number;
	let maxV: number;

	onMount(()=> {
		updateData(7);
	});
</script>

<div class="root">
	<select>
		<option>7</option>
		<option>30</option>
		<option>90</option>
	</select>
	<h1>{$priceData.length}</h1> <!--데이터 크기-->
	<div>
		
		<div class= "table">
			{#each $priceData as price}
			<div class="item" style="display: flex">
				<div id="itm" class="name">{price.denom}</div>
				<div id="itm" class="timestamp">{price.timestamp}</div>
				<div id="itm" class="price">{price.price}</div>
				<div id="itm" class="marketCap">{price.marketCap}</div>
				<div id="itm" class="dayVolume">{price.dayVolume}</div>
			</div>
			{/each}
		</div>
	</div>
	<div class="graph-field">
		
		<!--<BarGraph {data} {title} bind:minV bind:maxV>
			{#each data as d}
				<BarItem min={minV} max={maxV} value={d} />
			{/each}
		</BarGraph>-->
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
	
	#itm {
		width: 200px;
	}

	:global(body, html) {
		padding: 0;
		margin: 0;
	}
</style>
