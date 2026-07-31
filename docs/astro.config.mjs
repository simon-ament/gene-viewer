// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'GeneViewer',
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
					label: 'Python Reference',
					collapsed: true,
					items: [
						{
							slug: 'python-reference/gene-viewer',
						},
						{
							slug: 'python-reference/gene-viewer-server',
						},
						{
							label: 'RegionsLoader',
							items: [{ autogenerate: { directory: 'python-reference/RegionsLoader' } }],
						},
						{
							label: 'SequencesLoader',
							items: [{ autogenerate: { directory: 'python-reference/SequencesLoader' } }],
						},
						{
							label: 'TrackLoader',
							items: [{ autogenerate: { directory: 'python-reference/TrackLoader' } }],
						},
						{
							label: 'Processor',
							items: [{ autogenerate: { directory: 'python-reference/Processor' } }],
						}
					],
				},
				{
					label: 'Web Component Reference',
					collapsed: true,
					items: [{ autogenerate: { directory: 'web-component-reference' } }],
				},
				{
					label: 'JSON Format Reference',
					collapsed: true,
					items: [{ autogenerate: { directory: 'json-format-reference' } }],
				},
			],
		}),
	],
});
