<script lang="ts">
	export let min: number;
	export let max: number;
	export let value: number;

	let height: number = ((value - min) / (max - min)) * 100;

	$: {
		height = ((value - min) / (max - min)) * 100;
	}
</script>

<div class="root">
	<div class="item" style={`height: ${height}%`} />
</div>

<style lang="scss">
	.root {
		flex: 1 0;
		background: #0f3;
		border: solid 3px #000;
		position: relative;
		.item {
			width: 100%;
			position: absolute;
			bottom: 0;
			background: #f30;
		}
	}
</style>
