---
title: Probes
description: A reference page in my new Starlight docs site.
---

## Schema

Every such JSON file must adhere to the following type:

```ts
interface Probes {
    [probeset_id: string]: Probe[];
}

export interface Probe {
    id: string;
    start: number;
    end: number;
    transcript_ids: string[];
    locations: {
        start: number;
        end: number;
    }[] | null; // null if equal to the probe's start and end positions
    description?: string;
    metadata?: {
        [key: string]: string;
    };
};
```

## Example

```json
// example.json
[
    {
        "start": 70270263,
        "end": 70270290,
        "transcriptIds": ["NM_001605.3", "XM_047433666.1"],
        "description": "A description of this specific probe.",
        "locations": [
            {
                "start": 70270263,
                "end": 70270290,
            }
        ]
    }
]
```
