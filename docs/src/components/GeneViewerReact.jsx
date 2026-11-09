import 'gene-viewer'
import { useEffect } from 'react';

export default function GeneViewerReact() {
    useEffect(() => {
        const element = document.querySelector('gene-viewer');
        element.addEventListener(
            'geneViewerReady',
            () => {
                element.showGene('GSDMD');
            },
            { once: true }
        );
    }, []);

    return (
        <div className="viewer-shell">
            <gene-viewer
                viewerServer="http://localhost:5000/visualization"
                viewerId="human1"
                scaleFactor="1.2"
            ></gene-viewer>
        </div>
    );
}