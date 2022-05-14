# To-do App

## 🔥 Motivation

I always liked minimalist and clean design, and when I saw Dona for the first time, I NEEDED something like this. Since I’m currently learning programming, I decided to create my own Dona (literally copying their design).

Please check them out: [Dona](https://dona.ai/).

Also wanted to learn Redux and get in touch with ReactNative.

## 🖋️ Information

This project was made with React ⚛️, created with Vite ⚡️ and later on transposed to ReactNative. 📲.

Installed libs:

- Redux (no real need, just wanted to learn);
- Styled Components (also no real need, but started with it and... yeah);
- Framer-Motion;
- UUID (unique ID);

## 😅 Struggles

Here, I’ll tell you about my main struggles related to this application and what I’ve done to overcome them.

Really a log of problems I've encountered.

1. This whole project UI/UX was a big deal for me (I’d like it to be at least decent). Therefore, the app’s sidebar showed to be a problem for me - mainly when it comes to setting an `‘active’` sidebar item and stylizing it in a different way. That was the real reason I brougth `styled-components` for the journey. The truth is: I actually wasn’t able to do with it. I ended up solving this problem passing a conditional ‘active’ id for each `MenuItem` component and setting a general css for whoever got `id=’active’`.

1. Understanding `Redux` was a small challenge for me. It didn’t took to long, but it required me a good night of sleep, and in the morning I was able to set it up. The main issue (and actually something I did for the first time) was that I was app ending objects to an array set up on a state, and doing so as the user added a new task. After I solved it, it just needed a map function (for the array inside the `taskList` state) inside the component’s return. Went out pretty well, actually.

1. Filtering the task list was a real struggle for me, but I was able to do it with a `useEffect` hook, which checks for correspondences between the selected menu item and the task type and pushes to a new array only the tasks that matches. (outdated)

1. For animations (only to add some details), before even started coding, I thought of using `AOS`, but, after failling miserably, I understand its real intent and I used `Framer-Motion` instead, which is showing to be a very exciting library for animation.

1. Just correctly used `Redux` and `localStorage` together. It was a bit confusing because I was missing out some details related to the `initialState`. Also, as a quick log, I was able to optmize a lot the way tasks are filtered depending on current `window.location.pathname`.

1. Thinking about a way to mark as done or to remove a task, I installed `uuid`, a unique ID library. Then, I used `.filter()` function for arrays on the reducer.

1. Today, the big struggle was to change the `isDone` property of the `taskList` object. I was able to overcome it but I took me a few hours. Also, I refactored the icons and colors so they look more like Dona's design.

## ✨ Features

- [x] Write tasks
- [x] Add tasks
- [ ] Edit tasks
- [x] Remove tasks
- [x] Complete tasks
- [ ] Light/Dark Theme
- [ ] Order tasks (?)
