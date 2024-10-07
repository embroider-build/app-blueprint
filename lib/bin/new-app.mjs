/**
 * Usage:
 *
 *   pnpm output:new [...flags]
 *
 * Example:
 *
 *   pnpm output --typescript
 *
 *
 */

import { newApp } from '../new-app.mjs';

const [, , ...args] = process.argv;

let name = `my-ember-vite-app`;
let info = await newApp({ name, flags: args });

console.info(`

  New app created in ${info.dir}

`);
