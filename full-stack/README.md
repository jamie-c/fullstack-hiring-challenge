# Nodecraft Fullstack Hiring Challenge

## Introduction

This repository is a very simple example of a [Cloudflare Pages](https://pages.cloudflare.com/) project. It is orchestrated using [`wrangler`](https://developers.cloudflare.com/workers/wrangler/).

Install the [Wrangler CLI](https://developers.cloudflare.com/pages/platform/direct-upload/#wrangler-cli) and follow its onboarding for Cloudflare Pages

- The "API" for this project consists of a single endpoint, `/api/users` that returns a list of users. It defaults to 10, but can be increased by setting the `maxUsers` query param.
- The frontend for this project is a single index.html file, with an attached `index.js` file. This queries the endpoint, and then renders the results.

## Development

Run `npm run dev` to start the development server. This uses `wrangler pages dev`.

## Challenges

There are some issues with this project that need to be investigated and fixed. Each issue has many possible solutions, and we're interested in seeing how you approach them.

Please complete at least 2 of these challenges.

- [x] The API to retrieve users is very slow. How can we speed it up while still always returning 10 random users? Please demonstrate a solution.

- [ ] This currently only works in the browser using client-side JavaScript.

  - How can we make this work with JavaScript disabled? Think about server-side rendering and progressive enhancement. Please demonstrate a solution.
  - Keep in mind developer experience and ease of use for other team members working on this project. A modern framework would be an example solution.

- [x] Add a new feature that returns a deterministic list of users, based on a `seed` query param. Currently, 10 (or a specified number) of random users are always returned.
  - **Note: Please do not use the `seed` functionality built into randomuser.me. Think about another way to do this within a Cloudflare Worker.**
  - Update the backend to accept a `seed` query param, and use that to generate and store a random user list.
  - Update the frontend to send that `seed` query param via a textbox.
  - Any time the same `seed` is used, the same user list should be returned.

## Deployment

When ready, run `npm run deploy` to deploy your project to Cloudflare Pages. This uses `wrangler pages publish`. This will return a URL where you can view your project and submit to us, such as:

```
✨ Deployment complete! Take a peek over at https://fullstack-hiring-challenge-d6s.pages.dev/
```
