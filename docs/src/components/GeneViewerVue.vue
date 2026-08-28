<script setup>
import '../../../../gene-viewer-lit/dist/src/gene-viewer.js'

function onReady(event) {
    const { geneViewer } = event.detail;
    geneViewer.showGene('AARS1');
}
</script>

<template>
    <div class="viewer-shell">
        <gene-viewer @geneViewerReady="onReady"
            viewerServer="http://localhost:5000/api/visualization"
            viewerId="homo_sapiens"
            scaleFactor="1.2"
        ></gene-viewer>
    </div>
</template>

<style scoped>
.viewer-shell {
    border: 1px solid var(--sl-color-gray-5);
    padding: 2rem;
}

gene-viewer {
    --gene-viewer-background-color: var(--sl-color-black);
    --gene-viewer-text-color: var(--sl-color-white);
    --gene-viewer-border-color: var(--sl-color-gray-5);
}
</style>
