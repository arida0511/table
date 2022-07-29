<script lang="ts">
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
</script>

<div class="root">
	<div class="title-field">{title}</div>
	<div class="graph-field">
		<div class="l-guide">
			{#each leftGuides as v}
				<div class="guide-item">{v}</div>
			{/each}
		</div>
		<div class="graphics">
			<slot />
		</div>
	</div>
	<div class="under-field">// UNDER</div>
</div>

<style lang="scss">
	.root {
		$title-height: 48px;
		$under-height: 32px;
		height: 100%;
		width: 100%;
		.title-field {
			height: $title-height;
			background: #f00;
		}
		.graph-field {
			height: calc(100% - $title-height - $under-height);
			display: flex;
			position: relative;
			.l-guide {
				height: 100%;
				width: 100%;
				background: #ff0;
				display: flex;
				flex-direction: column;
				.guide-item {
					flex: 1 0;
					border-bottom: solid 1px #000;
				}
			}
			.graphics {
				right: 0;
				top: 0;
				height: 100%;
				width: calc(100% - 100px);
				position: absolute;
				background: rgba(0, 255, 0, 0.3);
				border-left: solid 2px #000;
				display: flex;
			}
		}
		.under-field {
			height: $under-height;
		}
	}
</style>
