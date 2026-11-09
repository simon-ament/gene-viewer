# GeneViewer

A lightweight and embeddable per-gene visualization of genomic regions, probes,
and custom tracks. Documentation: <https://simon-ament.github.io/gene-viewer/>

This repository contains:

| Folder           | Contents                                                | Published as         |
| ---------------- | ------------------------------------------------------- | -------------------- |
| `src/`           | Python package                                          | `gene_viewer` (PyPI) |
| `web-component/` | `<gene-viewer>` Lit web component                       | `gene-viewer` (npm)  |
| `docs/`          | Astro Starlight documentation site                      | GitHub Pages         |

## Installation

## Plotting in Jupyter

After configuring a `GeneViewer` with a regions loader and the data loaders
needed for the visualization, call `plot` with a gene ID:

```python
viewer.plot("gene-id")
```

The web component bundle ships with the Python package and is embedded in the
output, so plotting works offline. The component is configured directly with
the gene data, so a `GeneViewerServer` is not required for this use case.

## Development

The JavaScript packages are managed as npm workspaces from the repository root:

```bash
npm install          # installs all workspaces and sets up the pre-commit hook
npm run build:web    # builds the web component and copies its bundle into src/gene_viewer/static/
npm run dev:web      # web component demo with live reload
npm run dev:docs     # documentation dev server
npm run lint
```

`npm run build:web` must run before using `plot()` from a source checkout, since
the bundle is generated and not committed.

## Releasing

The Python package and the web component share one version number:

```bash
npm run version:set 0.2.0   # updates pyproject.toml, web-component/package.json and the lockfile
```

Publishing a GitHub release with the tag `v0.2.0` then publishes both packages.
