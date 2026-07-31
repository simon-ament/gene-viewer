---
title: <gene-viewer />
description: A reference page in my new Starlight docs site.
---

The `<gene-viewer />` [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) can be used in frontend web applications to display a GeneViewer instance.

## Properties

### `viewerServer: string`

The server route from which to fetch GeneViewer data managed by the [Python package](../python-reference/gene-viewer.md).

### `viewerId: string`

The unique identifier of the GeneViewer instance to display. Must match the identifier used by the [`viewerServer`](#viewerserver-string).

### `config: Partial<GeneViewerConfig>`

Configuration options for the GeneViewer instance. The default settings are:

```ts
{
    parallelProbesets: 1,
};
```

## Methods

### `showGene(geneId: string)`

Call this method to change the displayed gene.

### `showProbesets(probesetIds: string[])`

Call this method to change the displayed probeset. The length 

### `selectProbe(probeId: string | null)`

Use this method to programmtically select a probe in the visualization.

<!-- TODO: allow selecting features? -->

## Events

### `geneViewerReady`

This event is dispatched once the GeneViewer instance is initialized.

The event data contains a list of available genes.

### `geneChanged`

This event is dispatched when the displayed gene changes, either through an user interacting with the `<gene-viewer />` or programmatically.

The event data contains the `previousGeneId`, the `newGeneId`, as well as `isProgrammatic` indicating if the change was caused by a call to [`showGene`](#changegenegeneid-string).

It also contains a dictionary of available probesets and probes (including optional metadata) for this gene.

### `probesetsChanged`

This event is dispatched when the displayed probesets change.

The event data contains the `previousProbesetIds`, the `newProbesetIds`, as well as `isProgrammatic` indicating if the chage was caused by a call to [`showProbesets`](#showprobesetsprobesetids-string)

### `probeSelected`

This event is dispatched when the selected probe changes, either trough an user interacting with the `<gene-viewer />` or programmatically.

The event data contains the `previousProbeId`, the `newProbeId`, as well as `isProgrammatic` indicating if the change was caused by a call to [`selectProbe`](#selectprobeprobeid-string--null).

## Styling

Custom styling of the `<gene-viewer />` web component is possible via [CSS custom properties](https://lit.dev/docs/components/styles/#customprops). The following properties are available:

- `--gene-viewer-background-color`
