---
title: Tracks
description: A reference page in my new Starlight docs site.
---

## Schema

Every such JSON file adheres to the following JSON Schema:

```ts
// types.ts
export type Track = Feature[];

interface Feature {
    start: number;
    end: number;
    opacity?: number;
    item_rgb?: string;
    description?: string;
}
```

## Example

```json
// example.json
{
    "restrictionSites": [
        [
            {
                "start": 70270263,
                "end": 70270290,
                "transcriptIds": ["NM_001605.3", "XM_047433666.1"],
                "description": "A description of this specific feature."
            }
        ]
    ]
}
```
