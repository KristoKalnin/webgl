import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
        adapter: adapter(),

        vite: {
            test: {
                environment: "jsdom",
                setupFiles: ['src/routes/_setups_/setupWebglContext.ts'],
                threads: false,
            },
            //https://github.com/yushijinhun/three-minifier
            // -> as detailed in the package description then this will help resolve issues such as 'not a constructor'
            plugins: [
				{ ...threeMinifier(), enforce: "pre" } // <=== Add plugin here
			],
        },
    },
};

export default config;
