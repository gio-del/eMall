# Todos
1) Make a js object that has a method getConnectorIcon(type,themeMode), avoid importing multiple svgs
2) Fix dark mode (on first open two clicks to toggle)

# Possible problems
Probably for large datasets a lot of markers can decrease performance. Possible solution: https://www.npmjs.com/package/react-leaflet-canvas-markers

# Configuration Guide

## Create vite react app
```shell
npm create vite@latest
```
And follow the steps.
## Adding and configuring tailwind
### Install Tailwind CSS
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### Configure your template paths (the generated tailwind.config.cjs)
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], //the other json entries
```
### Add tailwind directives to the main css (index.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### Run and enjoy
```
npm run dev
```

# Getting react-router
```
npm install react-router-dom
```

# Adding leaflet (Map)
npm install react react-dom leaflet
npm install react-leaflet
