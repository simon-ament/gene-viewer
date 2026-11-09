---
title: Regions
description: A reference page in my new Starlight docs site.
---

## Schema

Every such JSON file adheres to the following JSON Schema:

```ts
// types.ts
interface Regions {
    [transcript_id: string]: Region[];
}

interface Region {
    start: number;
    end: number;
    type: string;
    strand?: string;
    description?: string;
    exon_number?: number;
}
```

## Example

```json
// example.json
{
    "NM_001605.3": {
        "start": 70289421,
        "end": 70289506,
        "type": "exon",
        "description": "Description for this specific region."
    }
}
```
