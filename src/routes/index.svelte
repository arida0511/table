<script lang="ts">
	import { BarGraph, BarItem } from '@src/component/bar-graph';
	import _ from 'lodash';
	import { onMount, onDestroy } from 'svelte';
	import { updateData, priceData, type PriceUnit } from '../store/index';
	import * as d3 from 'd3';

	let data: number[] = [1, 2, 3, 5, 8];
	let title: string = 'Hello World';
	let minV: number;
	let maxV: number;
	let days = [7, 30, 90, 180, 360];
	let names: string[];
	let selectedDay = days[0];
	let selectedName = [];
	let prices: [number, number][] = [];
	let path: string | null = '';
	let eleContainerWidth: number;
	let eleContainerHeight: number;
	let diff: number;

	onMount(() => {
		updateData(selectedDay);
	});

	//데이터 가공하는 곳
	const line = d3
		.line<[number, number]>()
		.x((d) => (d[0] * eleContainerWidth) / prices.length)
		.y((d) => ((d[1] - minV) * eleContainerHeight) / diff)
		.curve(d3.curveBasis); //곡선으로 만들기

	$: {
		prices = _($priceData)
			.map((d, i) => [i, d.price] as [number, number])
			.take(10)
			.value();
		path = line(prices);
		minV = _(prices)
			.map((p) => p[1])
			.min() as number;
		maxV = _(prices)
			.map((p) => p[1])
			.max() as number;
		diff = maxV - minV;
		console.log(eleContainerWidth, eleContainerHeight);
	}
</script>

<div class="root">
	<form>
		DAYS <select bind:value={selectedDay} on:change={() => updateData(selectedDay)}>
			{#each days as day}
				<option value={day}>{day}</option>
			{/each}
		</select>
		&nbsp;&nbsp;&nbsp; NAME
		<!--<select bind:value={selectedName} on:change={() => updateData(selectedName)} /-->
	</form>
	<h1>{selectedDay}&nbsp;&nbsp;&nbsp;{$priceData.length}</h1>
	<div
		class="svg-container"
		style="width:100%;height:500px"
		bind:clientWidth={eleContainerWidth}
		bind:clientHeight={eleContainerHeight}
	>
		<svg style="width: 100%; height:100%">
			<path d={path} />
		</svg>
	</div>
	<!--
		<select bind:value={selectedDay}>
		{#each urls as url}
		<option value={url.content}>{url.id}</option>
		{/each}
		</select>
	-->
	<div class="table">
		<table class="type08">
			<thead>
				<tr>
					<th>name</th>
					<th>timestamp</th>
					<th>price</th>
					<th>marketCap</th>
					<th>dayVolume</th>
				</tr>
			</thead>
			<tbody>
				{#each $priceData as price}
					<tr>
						<th class="name" scope="row">{price.denom}</th>
						<td class="timestamp">{price.timestamp}</td>
						<td class="price">{price.price}</td>
						<td class="marketCap">{price.marketCap}</td>
						<td class="dayVolume">{price.dayVolume}</td>
					</tr>
				{/each}
			</tbody>
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

		svg {
			path {
				fill: none;
				stroke: #f00;
				stroke-width: 2;
			}
		}
		.graph-field {
			height: 600px;
		}
		::-webkit-scrollbar {
			width: 20px;
		}
		::-webkit-scrollbar-track {
			background-color: #f1f1f1;
		}
		::-webkit-scrollbar-thumb {
			background-color: rgb(204, 204, 204);
		}
		::-webkit-scrollbar-thumb:hover {
			background: #787878;
		}
		::-webkit-scrollbar-button:start:decrement,
		::-webkit-scrollbar-button:end:increment {
			background-color: #dcdcd1;
		}
	}

	.table {
		height: 700px;
		overflow: auto;
	}

	//퍼옴
	table.type08 {
		border-collapse: collapse;
		text-align: left;
		line-height: 1.5;
		border-left: 1px solid #ccc;
		margin: 20px 10px;
	}

	table.type08 thead th {
		position: sticky;
		top: -1px;
		padding: 10px;
		font-weight: bold;
		border-top: 1px solid #ccc;
		border-right: 1px solid #ccc;
		border-bottom: 2px solid #c00;
		background: #dcdcd1;
	}
	table.type08 tbody th {
		width: 150px;
		padding: 10px;
		font-weight: bold;
		vertical-align: top;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		background: #ececec;
	}
	table.type08 td {
		width: 350px;
		padding: 10px;
		vertical-align: top;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	//여까지
	:global(body, html) {
		padding: 0;
		margin: 0;
	}
</style>
