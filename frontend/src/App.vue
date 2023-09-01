<script setup lang='ts'>
import { ref } from 'vue';

import HeroPicker from './components/HeroPicker.vue';
import type { Hero } from './types';

const HerculesAvatar = '/heros/hercules.png';
const OdysseusAvatar = '/heros/odysseus.png';
const AchillesAvatar = '/heros/achilles.png';

const heros = ref<Hero[]>([
	{
		name: 'Achilles',
		avatar: AchillesAvatar,
		speed: 10,
		strength: 4,
		intelligence: 6,
	},
	{
		name: 'Odysseus',
		avatar: OdysseusAvatar,
		speed: 6,
		strength: 5,
		intelligence: 9,
	},
	{
		name: 'Hercules',
		avatar: HerculesAvatar,
		speed: 6,
		strength: 10,
		intelligence: 4,
	},
]);
const hero = ref<Hero | null>(null);
const bonus = ref(0);

function doBonus() {
	if(bonus.value >= 5) {
		return alert('Only 5 bonus allowed!');
	}
	bonus.value++; // increase bonus!
}

function handleUpdate(input) {
	console.log('change', input);
	hero.value = input;
}
</script>

<template>
	<div
		class="
			bg-slate-800
			rounded
			max-w-sm
			grow
			w-full
			text-white
			flex flex-col
			gap-4
			p-4
		"
	>
		<span class="flex flex-row w-full justify-between items-baseline">
			<h1>Hero Stats:</h1>
			<button
			type="button"
			v-if="bonus > 0"
			class="
				hover:border-red-500
				text-sm 
				text-red-400
				pl-4
			"
			v-on:click="bonus = 0"	
			>reset bonus</button>
		</span>
		<div class="flex gap-4">
			<HeroPicker
				class="grow"
				v-bind:value="hero"
				v-bind:options="heros"
				v-on:selected="handleUpdate"
			></HeroPicker>
			<button
				type="button"
				class="
					border-green-500
					text-sm text-green-400
					border
					p-4
					px-4
					py-2
					rounded
				"
				v-on:click="doBonus"
			>
				BONUS {{ bonus > 0 ? `(${bonus})` : "" }} ✨
			</button>
		</div>
		<div v-if="hero" class="bg-slate-400 text-black rounded flex flex-row">
			<img v-bind:src="hero.avatar" class="w-[200px] h-52 object-cover object-center rounded-l">
			<div class="relative w-full pl-2">
				<span class="relative flex h-8 w-full flex-row justify-between">
					<h2 class="my-2 text-center text-xs uppercase sm:text-left">
						Hero Summary
					</h2>
					<!-- button to clear hero -->
					<button
						type="button"
						class="
						w-6
						h-6
						flex
						items-center
						justify-center
						top-0
						right-0
						text-sm
						p-4
						rounded-bl
						rounded-tl-none
						rounded-br-none
						rounded-tr
						text-slate-700
						bg-slate-500
						hover:bg-slate-700
						hover:text-slate-400
					"
						v-on:click="handleUpdate(null)"
					>
						X
					</button>
				</span>
				<p class="mb-2 text-lg">
					<span v-text="hero.name"></span>
				</p>
				<dl
					class="grid w-full grid-flow-row grid-cols-2 px-6 pb-4 pl-0 pr-2"
				>
					<dt class="text-sm uppercase overflow-visible">
						Speed:
					</dt>
					<dd class="text-right" v-text="hero.speed"></dd>
					<dt class="text-sm uppercase overflow-visible">
						Strength:
					</dt>
					<dd class="text-right" v-text="hero.strength"></dd>
					<dt class="text-sm uppercase overflow-visible">
						Intelligence:
					</dt>
					<dd class="text-right" v-text="hero.intelligence"></dd>
					<dt class="text-sm uppercase overflow-visible">
						Bonus:
					</dt>
					<dd class="text-right" v-text="bonus"></dd>
					<dt class="text-sm uppercase overflow-visible">
						Total:
					</dt>
					<dd
						class="text-right"
						v-text="hero.speed + hero.strength + hero.intelligence + bonus"
					></dd>
				</dl>
			</div>
		</div>
	</div>
</template>
