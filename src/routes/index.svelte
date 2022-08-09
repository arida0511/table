<script lang="ts">
	import { BarGraph, BarItem } from '@src/component/bar-graph';
import { update } from 'lodash';
	import {onMount, onDestroy} from 'svelte';
	import {updateData, getUrl,priceData, type PriceUnit} from '../store/index';
	let data: number[] = [1, 2, 3, 5, 8];
	let title: string = 'Hello World';
	let minV: number;
	let maxV: number;
	let days = [7,30,90,180,360];
	let selected = days[0];
	onMount(()=> {
		updateData(selected);
	});
</script>

<div class="root">
	<select bind:value={selected} on:change="{()=> updateData(selected)}">
		{#each days as day}
		<option value={day}>{day}</option>
		{/each}
	</select>
	<!--
		<select bind:value={selected}>
		{#each urls as url}
		<option value={url.content}>{url.id}</option>
		{/each}
		</select>
	-->
	<h1>{$priceData.length}</h1>
	<h1>{selected}</h1>
	<div>
		<table border="1">
			<tr>
				<th>name</th>
				<th>timestamp</th>
				<th>price</th>
				<th>marketCap</th>
				<th>dayVolume</th>
			</tr>
			{#each $priceData as price}
			<tr>
				<td id="itm" class="name">{price.denom}</td>
				<td id="itm" class="timestamp">{price.timestamp}</td>
				<td id="itm" class="price">{price.price}</td>
				<td id="itm" class="marketCap">{price.marketCap}</td>
				<td id="itm" class="dayVolume">{price.dayVolume}</td>
			</tr>
			{/each}
		</table>
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
