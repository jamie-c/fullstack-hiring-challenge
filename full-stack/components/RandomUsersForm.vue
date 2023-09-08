<script setup lang="ts">
import { ref } from "vue";

const maxUsers = ref(10);
const seedUsers = ref("");
const headerOptions = ref({});
const users = ref([]);
const isPending = ref(false);
const fetchError = ref(null);

type headerOptionsType = {
	maxUsers?: string;
	seed?: string;
};

headerOptions.value = {
	maxUsers: maxUsers.value.toString(),
};

interface RandomUsersResponse {
	data: any;
	error: any;
	pending: any;
	execute: () => void;
	refresh: () => void;
}
const { data, pending, execute, refresh, error }: RandomUsersResponse =
	await useFetch(() => "https://worker-tiny-hill-2f91.jamie-078.workers.dev/", {
		method: "GET",
		headers: {
			...headerOptions.value,
		},
	});

isPending.value = pending.value;

if (error.value) {
	console.log(
		"🚀 ~ file: RandomUsersForm.vue:42 ~ getUsers ~ error",
		error.value
	);
	fetchError.value = error.value;
}

users.value = data.value;

const getUsers = async () => {
	const options: headerOptionsType = {};
	if (maxUsers.value > 0) {
		options.maxUsers = maxUsers.value.toString();
	} else {
		options.maxUsers = "10";
	}
	if (seedUsers.value !== "") {
		options.seed = seedUsers.value;
	}
	type headerOptionsType = {
		maxUsers?: string;
	};

	headerOptions.value = options;

	const { data, pending, error }: RandomUsersResponse = await useFetch(
		() => "https://worker-tiny-hill-2f91.jamie-078.workers.dev/",
		{
			method: "GET",
			headers: {
				...headerOptions.value,
			},
		}
	);

	isPending.value = pending.value;

	if (error.value) {
		console.log(
			"🚀 ~ file: RandomUsersForm.vue:42 ~ getUsers ~ error",
			error.value
		);
		fetchError.value = error.value;
	}

	users.value = data.value;
};
</script>

<template>
	<form
		class="max-w-xl m-4 sm:mx-auto flex flex-col justify-center items-center gap-8 mt-16"
		@submit.prevent="getUsers"
	>
		<div class="relative w-full">
			<input
				id="maxUsers"
				class="peer h-16 px-6 py-4 w-full rounded-md border-2 border-gray-500 text-gray-500 placeholder-transparent focus:outline-none focus:border-2"
				min="1"
				max="5000"
				type="number"
				placeholder="Max Users: (default 10)"
				v-model="maxUsers"
			/>
			<label
				for="maxUsers"
				class="cursor-text absolute capitalize left-1 -top-5 font-semibold text-gray-500 text-sm transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-5 peer-placeholder-shown:uppercase peer-focus:-top-5 peer-focus:left-1 peer-focus:text-gray-500 peer-focus:text-sm peer-focus:capitalize"
				>Max Users (default 10):</label
			>
		</div>
		<div class="relative w-full">
			<input
				id="seedUsers"
				class="peer h-16 px-6 py-4 w-full rounded-md border-2 border-gray-500 text-gray-500 placeholder-transparent focus:outline-none focus:border-2"
				type="text"
				placeholder="SEED:"
				v-model="seedUsers"
			/>
			<label
				for="seedUsers"
				class="cursor-text absolute capitalize left-1 -top-5 font-semibold text-gray-500 text-sm transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-5 peer-placeholder-shown:uppercase peer-focus:-top-5 peer-focus:left-1 peer-focus:text-gray-500 peer-focus:text-sm peer-focus:capitalize"
				>Seed (optional):</label
			>
		</div>
		<button
			type="submit"
			class="text-lg text-white w-full px-6 py-4 bg-gray-600 border border-gray-600 rounded-md uppercase hover:bg-opacity-80 transition-all"
		>
			Fetch Users
		</button>
		<div class="w-full text-xl mx-auto mt-8">
			<p v-if="isPending">Fetching...</p>
			<pre v-else-if="fetchError">{{ error }}</pre>
			<ul v-else class="w-full text-left flex flex-col gap-4">
				<li v-for="(user, index) in users" :key="index">
					<UserCard v-if="userCardIsShown" :key="index + 'card'" :user="user" />
				</li>
			</ul>
		</div>
	</form>
</template>
