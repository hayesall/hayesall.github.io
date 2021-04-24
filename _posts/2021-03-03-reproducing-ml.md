---
layout: article
title: "Create Demo Data sets in the browser"
description: "Click to add points, get a data set."
date: 2021-03-03
excerpt: >-
  Click to add points, get a data set.
categories: blog
tags: ["machine-learning"]
comments: true
image:
  teaser: teaser/create_ml_datasets_teaser.jpg
---

Create demo data sets for explaining concepts in machine learning.

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
    <input type="range" id="current_label" name="Label" min="0" max="8" value="0">
    <p>Class label: <span id="demo"></span></p>
    <button id="reset" onclick="graph.reset()">Reset</button>
    <p>Python:
      <button id="exportAsNumpy" onclick="exportAsNumpy()">Copy np.array</button>
      <button id="exportAsPandas" onclick="exportAsPandas()">Copy pd.DataFrame</button>
    </p>
  </div>
</div>

<textarea id="outputArea" rows="5" cols="75" spellcheck="false"></textarea>
<script src="/js/canvas.js"></script>

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
var output = document.querySelector("#demo");
slider.oninput = function() {
  output.innerHTML = this.value;
}
</script>
