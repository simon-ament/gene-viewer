---
title: Gene
description: A reference page in my new Starlight docs site.
---

Every gene to be visualized by the GeneViewer is stored as a JSON file at `<viewerId>/<geneId>.json` relative to the [`storagePath`]() passed to the GeneViewer.

For example, information on the gene "AARS1" for a GeneViewer instance with identifier "9fec22e5-fbf4-44f2-84d8-b267f1ee1524" would be stored in `9fec22e5-fbf4-44f2-84d8-b267f1ee1524/AARS1.json`.

## JSON Schema

Every such JSON file adheres to the following JSON Schema:

```json

```

## Example

```json
{
    "id": "AARS1",
    "source": "The source of the gene annotation.",
    "species": "The species the gene belongs to.",
    "strand": "-", #TODO: uniform on gene?
    "probes": {...},
    "regions": {...},
    "sequences": {...},
    "tracks": {...}
}
```

## Notes

- Strand uniform per gene (source?)
