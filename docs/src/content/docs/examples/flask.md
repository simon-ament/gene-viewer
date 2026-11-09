---
title: Flask Server Example
description: A reference page in my new Starlight docs site.
---

```py
# server.py
from flask import Flask, request

app = Flask(__name__)
gene_viewer_server = GeneViewerServer("/visualizations")

@app.route("/api/visualization")
def visualization():
    viewer_id = request.args.get('viewer_id', type=str)
    gene_id = request.args.get('gene_id', type=str)
    visualization_data = gene_viewer_server.serve(viewer_id, gene_id)
    return visualization_data
```