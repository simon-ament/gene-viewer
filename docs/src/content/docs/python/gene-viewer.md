---
title: GeneViewer
description: A reference page in my new Starlight docs site.
---

The `GeneViewer` class is the central interface for creating visualization descriptions in the specified [JSON format](/json/gene) to be provided to a [`<gene-viewer>`](/web-component/gene-viewer) web component.

In order to generate such JSON files, a `GeneViewer` has to load information on the genes of interest from various sources, such as Fasta, GTF, or BED files.


## Initializing a `GeneViewer`

When initializing a new `GeneViewer`, two arguments **must** be provided:

1. `viewer_id: str`: The unique identifier of this `GeneViewer` instance. This can be used to later identify the generated JSON files, for example when requested by a [`<gene-viewer>`](/web-component/gene-viewer) component.
2. `dir_path: str`: The directory to store generated files in. For a better overview, the `GeneViewer` will create subdirectories within the specified directory.

The following arguments **can** be provided in addition:

3. `genes_without_probes: "ignore" | "cache" | "visualize"`: Indicating how the `GeneViewer` should treat genes, that no [probes](/json/probes) were provided for. It can either ignore them, preemptively [cache](#creating-visualization-descriptions) them for future `GeneViewer`s to use, or simply create visualizations descriptions for them as well.
4. `species`: The species the provided genes belong to.
5. `source`: The source of the provided data / files.

```py
// example.py
viewer = GeneViewer(
    "df83316df83",
    "content/visualizations",
    genes_without_probes="visualize"
    species="Homo Sapiens"
    source="NCBI"
)
```


## Providing Data

Visualizable data like genomic regions, sequences, probes, and custom tracks can be provided via so called **Loaders**. Loaders for the most common use cases are already build in, so you can call them directly on your just created `GeneViewer` instance.

The following load methods are available directly on every `GeneViewer`:

- `load_regions_GTF`: Loads genomic regions from a [GTF file](https://genome.ucsc.edu/FAQ/FAQformat.html#format4). Every feature entry must contain the `gene_id` and `transcript_id` attribute.
    - Use the optional `region_types: list[str]` argument of the load function to restrict loading to specific region types.
- `load_regions_ODTFasta`: Loads genomic regions from a Fasta file with headers in the [format used by the Oligo Designer Toolsuite](https://oligo-designer-toolsuite.readthedocs.io/en/latest/_getting_started/_tutorials/2-oligo-database.html#Input-Requirements-for-FASTA-Files). It is recommended that this file contain "gene" entries for all genes of interest, as otherwise the location of these genes has to be inferred from genomic regions like exons.
    - Use the optional `region_types: list[str]` argument of the load function to restrict loading to specific region types.
- `load_sequences_Fasta`: Loads sequences from a [Fasta](https://www.ncbi.nlm.nih.gov/genbank/fastaformat/) file. The locations of genes of interest are gathered from [regions loaders](/python/regions-loader), thus only the `SeqID` (first coherent string in every header) is mandatory.
- `load_sequences_ODTFasta`: Loads genomic regions from a Fasta file with headers in the [format used by the Oligo Designer Toolsuite](https://oligo-designer-toolsuite.readthedocs.io/en/latest/_getting_started/_tutorials/2-oligo-database.html#Input-Requirements-for-FASTA-Files).
    - Use the optional `region_types: list[str]` argument of the load function to restrict loading to specific region types.
- `load_track_BED`: Loads a custom track from a [BED file](https://genome.ucsc.edu/FAQ/FAQformat.html#format1). Use the `track_name: str` argument to specify the name of the track. Track lines inside the file are ignored.
    - Use the optional `opacity_from_score: bool` (default `False`) and `max_score: float` (default `1000.0`) arguments to determine every features opacity from its score filed.
- `load_track_GTF`: Loads a custom track from a [GTF file](https://genome.ucsc.edu/FAQ/FAQformat.html#format4).
    - Use the optional `opacity_from_score: bool` (default `False`) and `max_score: float` (default `1000.0`) arguments to determine every features opacity from its score field.
- `add_probe`: Probes must be added sequentially as a `dict` in [`Probe`](/json/probes) format.

Custom loaders can be provided via the `add_regions_loader`, `add_sequences_loader`, and `add_track_loader` methods.

## Processing Data

Quite often, data available in standard genomic file formats is either too concise or too verbose for the actual purpose. Instead of having to filter or manipulate input data before loading it into a `GeneViewer` instance, every such instance provides the option of per-gene processing through built-in or [custom processors](/python/processor).

The following processors are available on every `GeneViewer` instance:

- `merge_exon_junctions`: The [Fasta format used by the Oligo Designer Toolsuite](https://oligo-designer-toolsuite.readthedocs.io/en/latest/_getting_started/_tutorials/2-oligo-database.html#Input-Requirements-for-FASTA-Files) commonly uses "exon_junction" regions, which only cover the outer ends of "exon" regions. This processor merges neighboring junctions with equal exon numbers into a single exon.
- `fill_gaps_with_introns`: This processor fills gaps between exons with introns, which is primarily useful when only "exon" regions could be loaded.
- `restrict_to_exon_sequences`: This processor filters all loaded sequences to only keep such sections, that overlap an exon. This can help reduce storage usage.

Custom processors can be provided via the `add_processor` method.

## Creating Visualization Descriptions

The final purpose of every `GeneViewer` instance is the creation of [visualization descriptions](/json/gene) to be visualized using a [`<gene-viewer />` web component](/web-component/gene-viewer). There are two different methods available that create such JSON files.

The `save` method is the default way of creating visualization description JSON files. It uses a clever caching strategy to avoid storing duplicate information on disk, when multiple visualizations share one or more input files (e.g., a common annotation for "Homo sapiens"). This reduces run time and storage usage. The exact caching behavior can be defined using the `genes_without_probes` argument when [initializing the `GeneViewer`](#initializing-a-geneviewer).

To enable this form of caching, the visualization description JSON files are split into multiple components that can be recombined by the [`GeneViewerServer`](/python/gene-viewer-server).

If you are not planing to use the [`GeneViewerServer`](/python/gene-viewer-server), you should probably use the `save_raw` method instead. It does not perfom any caching and instead creates exactly one JSON file per gene, which can readily be consumed by every [`<gene-viewer />`](/web-component/gene-viewer) or [`<gene-viewer-raw />`](/web-component/gene-viewer-raw) component. If `genes_without_probes="cache"` was provided, it will be ignored.
