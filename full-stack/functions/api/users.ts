export const onRequestGet: PagesFunction = async (context) => {
	const url = new URL(context.request.url);
	type headerOptions = {
		maxUsers?: string;
		seed?: string;
	};
	const headerOptions: headerOptions = {};

	// retrieve 10 users by default, allow override with maxUsers query param
	let maxUsers = '10';
	if(url.searchParams.has('maxUsers')) {
		maxUsers = url.searchParams.get('maxUsers') as string;
		headerOptions.maxUsers = maxUsers;
	}
	let seed = '';
	if(url.searchParams.has('seed')) {
		seed = url.searchParams.get('seed') as string;
		headerOptions.seed = seed;
	}

	// set url search param to masUsers and get users
	// this will make one request to the randomuser.me api

	const res = await fetch(
		'https://worker-tiny-hill-2f91.jamie-078.workers.dev/',
		{
			headers: {
				...headerOptions,
			},
		},
	);
	const data = await res.json();

	return Response.json(data);
};
