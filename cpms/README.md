# Create vite react app
```shell
npm create vite@latest
```
# Adding and configuring tailwind
## Install Tailwind CSS
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
## Configure your template paths (the generated tailwind.config.cjs)
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], //the other json entries
```
## Add tailwind directives to the main css (index.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Run and enjoy
```
npm run dev
```
