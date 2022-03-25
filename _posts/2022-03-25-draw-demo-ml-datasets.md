---
layout: article
title: "Draw Demo Data for Machine Learning in the Browser"
description: "Click to add points, export as code."
date: 2022-03-25
excerpt: >-
  Click to add points, export as code.
categories: blog
tags: ["machine-learning"]
comments: true
image:
  teaser: teaser/create_ml_datasets_teaser.jpg
---

<style>
textarea {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
  font-family: monospace;
}
</style>

<div class="row">
  <div class="column">
    <canvas id="dataCanvas" style="cursor:crosshair;border:1px solid #000000;"></canvas>
  </div>
  <div class="column">
    <p>Class label: <span id="label">0</span></p>
    <input type="range" id="current_label" name="Label" min="0" max="8" value="0">
    <button style="margin-top: 1em;" id="reset" onclick="graph.reset()">Clear all points</button>
    <hr>
    <p><strong>Python</strong>:
      <button id="exportAsNumpy" onclick="exportAsNumpy()">Copy np.array</button>
      <button id="exportAsPandas" onclick="exportAsPandas()">Copy pd.DataFrame</button>
    </p>
    <hr>
    <p>Click the canvas to add a point. Use the slider to switch class labels.</p>
    <p>If all points have the same class label: creates a <strong>Regression</strong> dataset; otherwise: <strong>Classification</strong>.</p>
  </div>
</div>

<textarea id="outputArea" rows="5" cols="75" spellcheck="false"></textarea>
<script src="/js/canvas.js"></script>

## Why?

Whether I'm answering questions on StackOverflow, teaching someone about classification
or regression, or making sure my RANSAC implementation works how I expect it to—I always
find myself wanting a tool where I can click to draw some points on a canvas and
run my algorithm on it.

<script>
function exportAsNumpy() {
  const textarea = document.querySelector("#outputArea");
  textarea.value = "";
  textarea.value += graph.export_as_numpy();
  copyToClipboard(textarea);
}

function exportAsPandas() {
  const textarea = document.querySelector("#outputArea");
  textarea.value = "";
  textarea.value += graph.export_as_pandas();
  copyToClipboard(textarea);
}

function copyToClipboard(text) {
  text.select();
  text.setSelectionRange(0, 99999)
  document.execCommand("copy");
}

var slider = document.querySelector("#current_label");
var output = document.querySelector("#label");
slider.oninput = function() {
  output.innerHTML = this.value;
}
</script>
