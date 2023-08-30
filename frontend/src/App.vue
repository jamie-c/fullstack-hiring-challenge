<script setup lang="ts">
import { ref } from 'vue';

import heroPicker from './components/heroPicker.vue';
import type { Hero } from './types';

import AchillesAvatar from '../public/heros/achilles.png';
import HerculesAvatar from '../public/heros/hercules.png';
import OdysseusAvatar from '../public/heros/odysseus.png';

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
		<h1>Hero Stats:</h1>
		<div class="flex gap-4">
			<heroPicker
				class="grow"
				v-bind:value="hero"
				v-bind:options="heros"
				v-on:selected="handleUpdate"
			></heroPicker>
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
				BONUS {{ bonus > 0 ? `(${bonus})` : '' }} ✨
			</button>
		</div>
		<div v-if="hero" class="bg-slate-400 text-black rounded flex flex-col sm:flex-row">
			<img v-bind:src="hero.avatar" class="w-full sm:w-52 h-52 object-cover object-center rounded-t sm:rounded-l sm:rounded-tr-none">
			<div class="relative w-full pl-4 sm:pl-2">
				<span class="relative w-full h-8 flex flex-row justify-between">
					<h2 class="uppercase text-xs text-center sm:text-left my-2">
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
						sm:rounded-tr
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
				<p class="text-lg mb-2">
					<span v-text="hero.name"></span>
				</p>
				<dl class="grid grid-flow-row grid-cols-2 w-full px-6 sm:pl-0 sm:pr-2 pb-4">
					<dt class="uppercase text-sm overflow-auto sm:overflow-visible">
						Speed:
					</dt>
					<dd class="text-right" v-text="hero.speed"></dd>
					<dt class="uppercase text-sm overflow-auto sm:overflow-visible">
						Strength:
					</dt>
					<dd class="text-right" v-text="hero.strength"></dd>
					<dt class="uppercase text-sm overflow-auto sm:overflow-visible">
						Intelligence:
					</dt>
					<dd class="text-right" v-text="hero.intelligence"></dd>
					<dt class="uppercase text-sm overflow-auto sm:overflow-visible">
						Bonus:
					</dt>
					<dd class="text-right" v-text="bonus"></dd>
					<dt class="uppercase text-sm overflow-auto sm:overflow-visible">
						Total:
					</dt>
					<dd class="text-right" v-text="hero.speed + hero.strength + hero.intelligence + bonus"></dd>
				</dl>
			</div>
		</div>
	</div>
</template>
