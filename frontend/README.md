# Nodecraft Fullstack Frontend Hiring Challenge

## Introduction

This repository is a basic Vue 3 & Tailwind frontend project. It's built using Vite to build and run the project.

Run `npm ci` to install dependencies.

## Development

Run `npm run dev` to start the development server. This uses `vite --host` to buid and run a dev server.

## Challenges

There are some issues with this project that need to be investigated and fixed. Each issue has many possible solutions, and we're interested in seeing how you approach them.

Must complete all of these challenges:

- [ ] Fix any functional issues with the component that don’t match Vue 3 Component standards and best practices outline on the Vue 3 Docs.
- [x] Fix the dropdown menu from remaining open always after a hero selection is made.
- [x] Ensure all hero stats equal a sum of `20` plus the current amount of bonus. This total should never be above `25` with the bonus included.
- [x] Add keyboard controls for the drop down hero select button and menu item to be accessible
- [x] Fix the image so it matches the rounding of its container and doesn’t change width/height when it changes

Please complete at least 2 of these additional challenges:

- [x] Implement a "clear hero" feature after a hero selection is made, to return to the default `null` state.
- [x] Fix the style so the Selection button doesn’t break line and takes up empty space from the Bonus Button. The fix should not allow the text to overflow into sibling elements
- [x] Make the box centered on the page using just TailwindCSS and a css flex-based solution.
