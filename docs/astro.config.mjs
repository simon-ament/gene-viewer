// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

import svelte from '@astrojs/svelte';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'GeneViewer',
        customCss: [
            '@fontsource-variable/geist/wght.css',
            './src/styles/custom.css',
        ],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
        sidebar: [
            {
                label: 'Guides',
                items: [{ autogenerate: { directory: 'guides' } }],
            },
            {
                label: 'Examples',
                items: [{ autogenerate: { directory: 'examples' } }],
            },
            {
                label: 'Python Package',
                collapsed: true,
                items: [{ autogenerate: { directory: 'python' } }],
            },
            {
                label: 'Web Component',
                collapsed: true,
                items: [{ autogenerate: { directory: 'web-component' } }],
            },
            {
                label: 'JSON Format',
                collapsed: true,
                items: [{ autogenerate: { directory: 'json' } }],
            },
        ],
        }), vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('gene-viewer')
                }
            }
            }
        ), svelte(), react()],
});