// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

import svelte from '@astrojs/svelte';

import react from '@astrojs/react';

// Served from GitHub Pages at https://simon-ament.github.io/gene-viewer/
const base = '/gene-viewer';

/**
 * Prefixes root-relative links in Markdown content (e.g. `/python/gene-viewer`)
 * with `base`, since Astro does not rewrite them.
 * @returns {(tree: any) => void}
 */
function rehypePrefixBase() {
    const prefix = (/** @type {any} */ node) => {
        const href = node.properties?.href;
        if (
            node.tagName === 'a' &&
            typeof href === 'string' &&
            href.startsWith('/') &&
            !href.startsWith('//') &&
            href !== base &&
            !href.startsWith(`${base}/`)
        ) {
            node.properties.href = base + href;
        }
        node.children?.forEach(prefix);
    };
    return prefix;
}

// https://astro.build/config
export default defineConfig({
    site: 'https://simon-ament.github.io',
    base,
    markdown: {
        rehypePlugins: [rehypePrefixBase],
    },
    integrations: [starlight({
        title: 'GeneViewer',
        customCss: [
            '@fontsource-variable/geist/wght.css',
            './src/styles/custom.css',
        ],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/simon-ament/gene-viewer' }],
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