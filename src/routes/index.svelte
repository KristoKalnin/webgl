<script context="module">
	import { browser, dev } from '$app/env';

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// dynamic data here, don't prerender
	export const prerender = false;

	// Server Side Rendering
	//export const ssr = false;
</script>

<script lang="ts">
	/*
	const SLEEP:any = (milliseconds: number) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};
	*/

	import BurgerMenu from 'svelte-burger-menu';
	import { onMount } from 'svelte';

	import {
		camera2D,
		camera3D,
		increaseOrbitSpeed,
		decreaseOrbitSpeed,
		//toggleShadows,
		addSolarPanel,
		changeWidth,
		changeLength,
		changeLeftRidge,
		changeRightRidge
	} from './scene';

	let el: object;
	let width: number = 10000;
	let length: number = 5000;
	let leftRidge: number = 0;
	let rightRidge: number = 0;

	let mounted: boolean = false;
	onMount(async () => {
		mounted = true;
		if (typeof window !== 'undefined') {
			let { createScene } = await import('./scene');
			createScene(el);
		}

		changeWidth(width / 1000);
		changeLength(length / 1000);
	});

	let showRidgeInputs = false;

	$: {
		//changeLeftRidge(leftRidge / 1000);
		//changeRightRidge(rightRidge / 1000);
	}
</script>

<main>
	<nav>
		<BurgerMenu>
			<ul id="burger">
				<li><h2>Misc.</h2></li>
				<!--
                <li>
					<h3>Shadows</h3>
					<button on:click={() => toggleShadows()}> Roof & Solar Panel(s) </button>
				</li>
                -->
				<li>
					<h3>Sun & Moon</h3>
					Orbital speed:
					<button on:click={() => decreaseOrbitSpeed()}> - </button>
					<button on:click={() => increaseOrbitSpeed()}> + </button>
				</li>
				<li>
					<h3>Camera</h3>
					<button on:click={() => camera2D()}> 2D </button>
					<button on:click={() => camera3D()}> 3D </button>
				</li>
			</ul>
		</BurgerMenu>

		<ul>
			<li>
				<label>
					Width
					<input
						type="number"
						placeholder="width"
						bind:value={width}
						min="1"
						max="99999"
						on:change={() => changeWidth(width / 1000)}
					/>
					<input type="text" value="mm" readonly />
					<button on:click={() => (showRidgeInputs = !showRidgeInputs)}>
						{#if showRidgeInputs}
							↩
						{:else}
							↪
						{/if}
					</button>
					{#if showRidgeInputs}
						Ridge indents
						<input
							type="number"
							placeholder="left ridge"
							bind:value={leftRidge}
							on:change={() => changeLeftRidge(leftRidge / 1000)}
						/>
						<input type="text" value="mm" readonly />

						<input
							type="number"
							placeholder="right ridge"
							bind:value={rightRidge}
							on:change={() => changeRightRidge(rightRidge / 1000)}
						/>
						<input type="text" value="mm" readonly />
					{/if}
				</label>
			</li>

			<li>
				<label>
					Slope length
					<input
						type="number"
						placeholder="length"
						bind:value={length}
						min="1"
						max="99999"
						on:change={() => changeLength(length / 1000)}
					/>
					<input type="text" value="mm" readonly />
				</label>
			</li>
			<li>
				<!-- Solar panel dimensions (554 mm x 2270 mm) -->
				<button on:click={() => addSolarPanel(0.554, 2.27)}> Add Solar Panel </button>
			</li>
		</ul>
	</nav>
</main>
{#if mounted}
	<canvas bind:this={el} />
{/if}

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	nav {
		background-color: #ffffff;
		position: absolute;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	ul > li {
		display: inline-block;
		margin: 5px;
	}

	#burger > li {
		display: list-item;
	}

	input[type='number'] {
		width: 80px;
	}

	/*
	nav > input[type='number'] {
		padding-right: 20px;
		text-align: right;
	}
    */

	input[type='text'] {
		width: 50px;
		text-align: center;
		margin-left: -5px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
