---
title: Sequences
description: A reference page in my new Starlight docs site.
---

## Schema

Every such JSON file adheres to the following JSON Schema:

```ts
// types.ts
type Sequences = Sequence[];

interface Sequence {
    start: number;
    sequence: string;
}

```

## Example

```json
// example.json
[
    {
        "start": 70289506,
        "sequence": "GAGAGGATCCCAGCGGCaggggtcgaggagggagtcTCAGGGGGCGGTTCCCGGGCGACGTGGATAAGGGCGTCTGCGCGTCGACA"
        #TODO: strand explicit or implicit?
    }
]
```
