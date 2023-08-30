<template>
	<div class="relative">
		<button
			type="button"
			class="
				block
				w-32
				px-4
				py-2
				text-sm
				font-medium
				text-white
				bg-indigo-600
				rounded-lg
				hover:bg-indigo-700
				focus:outline-none
				focus-visible:ring
				focus-visible:ring-indigo-500
				focus-visible:ring-opacity-75
				cursor-pointer
			"
			v-bind:aria-expanded="isOpen"
			v-bind:aria-haspopup="true"
			v-bind:aria-controls="isOpen ? 'hero-menu' : null"
			v-on:click="toggleMenu"
		>
			<span v-if="!value">Select a Hero</span>
			<span v-else v-text="`Selected: ${value?.name}`"></span>
		</button>
		<ul
			v-show="isOpen"
			class="
				absolute
				right-0
				z-10
				w-32
				mt-2
				origin-top-right
				bg-slate-800
				border border-slate-500
				rounded-md
				shadow-lg
			"
		>
			<li v-for="option in options" v-bind:key="option.name" class="py-1">
				<a
					href="#"
					class="
						flex
						items-center
						px-4
						py-2
						text-sm text-slate-400
						hover:bg-slate-700
						gap-2
					"
					v-on:click="setOption(option)"
				>
					<img
						v-bind:src="option.avatar"
						alt="avatar"
						class="w-6 aspect-square rounded"
					>
					<span v-text="option.name"></span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';
import type { Hero } from '../types';

const props = defineProps({
	value: Object as PropType<Hero | null>,
	options: Array as PropType<Hero[]>,
});

const emit = defineEmits(['selected']);
const isOpen = ref(false);

function toggleMenu() {
	isOpen.value = !isOpen.value;
}

function setOption(input) {
	toggleMenu();
	props.value = input;
	emit('selected', input);
}
</script>
