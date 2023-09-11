/**
 * This worker accepts optional parameters in the header
 * results: if provided, sets the number of users to fetch from randomuser.me, defaults to 10
 * seed: if provided and prviously set, returns the set of users associated with the value
 *       if provided, but not previously set, fetches a new set of users and stores the results to the seed value
 *       if not provided, returns a random set of users, and does not save the results
 */

function getUnixEpochTimeForOneMonthFromNow() {
	const currentDate = new Date();

	// Calculate the date one month from now
	const oneMonthLaterDate = new Date(currentDate);
	oneMonthLaterDate.setMonth(currentDate.getMonth() + 1);

	// Calculate the Unix Epoch time (in milliseconds) for the one month later date
	const unixEpochTimeMilliseconds = oneMonthLaterDate.getTime();

	// Convert to seconds (Unix Epoch time is in seconds)
	const unixEpochTimeSeconds = Math.floor(unixEpochTimeMilliseconds / 1000);

	return unixEpochTimeSeconds;
}

const corsHeaders = {
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
};

export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response('OK', { headers: corsHeaders });
		}

		if (request.method === 'GET') {
			const EPOCH_ONE_MONTH = getUnixEpochTimeForOneMonthFromNow();

			// get the seed parameter from the header
			const providedSeed = request.headers.get('seed');
			// get the stored value from the providedSeed key
			const storedSeed = await env.SEED.get(providedSeed);
			// check if storedSeed exists, then return it's value if it does
			if (storedSeed) {
				await env.SEED.put(providedSeed, storedSeed, { expiration: EPOCH_ONE_MONTH });
				return new Response(storedSeed, {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}

			// get the maxUsers parameter from the header
			const maxUsers = request.headers.get('maxUsers');
			const apiHost = 'https://randomuser.me/api/';
			const url = apiHost + '?results=' + maxUsers;
			const userRes = await fetch(url);
			// get results from response
			const { results } = await userRes.json();

			if (!providedSeed && !maxUsers) {
				return new Response(JSON.stringify({ message: 'missing maxUsers and seed keys in the header...' }), {
					status: 404,
					statusText: 'missing information',
					headers: corsHeaders,
				});
			}

			// if a seed was provided, but not in KV store, save it for later retrieval
			if (providedSeed) {
				await env.SEED.put(providedSeed, JSON.stringify(results), { expiration: EPOCH_ONE_MONTH });
			}

			const response = new Response(JSON.stringify(results), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders,
				},
			});
			return response;
		}
	},
};
