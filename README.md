# OPS200 Webpack Workshop

A small project that uses **webpack** and **Babel** to bundle a React app into one file. An Express server then serves that file.

## What it covers

- Bundling ES modules from `src/` into `dist/bundle.js`
- Using a `webpack.config.js` file and npm scripts in place of long CLI commands
- Transforming JSX with `babel-loader` (`@babel/preset-env` and `@babel/preset-react`)
- Comparing production mode (minified) with development mode
- Turning on source maps (`bundle.js.map`) for debugging in DevTools

## Project structure

```
ops200-webpack-workshop
|- package.json
|- webpack.config.js
|- .babelrc
|- server.js        # Express server for public/ and dist/
|- src/
|   |- index.js     # entry point (React)
|- public/
|   |- index.html   # loads bundle.js
|- dist/            # build output (generated, not committed)
```

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm start
```

`npm start` runs the webpack build and then starts the server. Open http://localhost:3000. The page should say:

```
React and webpack are working!
```

## Scripts

| Command                       | What it does                                  |
| ----------------------------- | --------------------------------------------- |
| `npm run build`               | Bundles `src/` into `dist/` in development mode |
| `npm start`                   | Builds, then runs `node server.js`            |
| `npm test`                    | Builds, then runs the Mocha tests in `test/`  |
| `npx webpack --mode production` | Builds a minified production bundle         |

## Deploying to Render

Create a **Web Service** that points at this repository and use these settings:

- **Build command:** `npm install && npm run build`
- **Start command:** `node server.js`

The server reads the port from `process.env.PORT`, which Render sets for you.
