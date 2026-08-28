import '../../../../gene-viewer-lit/dist/src/gene-viewer.js'
import { useEffect } from 'react';

export default function GeneViewerReact() {
    useEffect(() => {
        const element = document.querySelector('gene-viewer');
        element.addEventListener(
            'geneViewerReady',
            () => {
                element.showGene('AARS1');
            },
            { once: true }
        );
    }, []);

    return (
        <div className="viewer-shell">
            <gene-viewer
                viewerServer="http://localhost:5000/api/visualization"
                viewerId="homo_sapiens"
                scaleFactor="1.2"
            ></gene-viewer>
        </div>
    );
}