export const onRequestGet: PagesFunction = async (context) => {
	const url = new URL(context.request.url);

	// retrieve 10 users by default, allow override with maxUsers query param
	let maxUsers = 10;
	if(url.searchParams.has('maxUsers')) {
		maxUsers = Number.parseInt(url.searchParams.get('maxUsers') as string);
	}

	const userRes = await fetch(`https://randomuser.me/api/?results=${maxUsers}`);
	const {results} = await userRes.json<any>();
	return Response.json(results);
};
