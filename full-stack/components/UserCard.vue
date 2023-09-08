<script setup lang="ts">
import type { PropType } from "vue";
import type { User } from "../types";

const props = defineProps({
	user: {
		type: Object as PropType<User | null>,
		default: null,
		required: true,
	},
});
</script>

<template>
	<div
		class="relative flex flex-row gap-4 items-baseline justify-between border border-gray-600 rounded-md p-4 shadow-md hover:bg-gray-100 transition-all overflow-hidden"
	>
		<span class="flex flex-row gap-4 items-start">
			<img :src="user?.picture.thumbnail" />
			<div>{{ user?.name.first }} {{ user?.name.last }}</div>
		</span>
		<div class="absolute bottom-2 right-4 text-sm text-gray-500 text-right">
			{{ user?.location.city }}, {{ user?.location.state }},
			{{ user?.location.country }}
		</div>
	</div>
</template>
