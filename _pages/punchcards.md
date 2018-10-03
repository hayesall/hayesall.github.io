---
layout: media
title: Punchcards
description: I have measured my life in coffee spoons.
share: false
---

<center><i>
Have known the evenings, mornings, afternoons,<br>
I have measured out my life with coffee spoons;<br>
T.S. Eliot
</i></center>

<br><br>

<div style="overflow: auto">
<div class="replacehere" style="width: window.innerHeight"></div>
</div>

<script src="https://d3js.org/d3.v4.min.js"></script>

<script>
var width = 960,
    height = 136,
    cellSize = 17;

var formatPercent = d3.format(".1%");

var color = d3.scaleQuantize()
    .domain([0, 800.0])
    .range(["#F6FCF2", "#E0F4DB", "#CCEAC6", "#AADCB6", "#7BCCC5", "#4EB2D2", "#2B8DBE", "#0768AC", "#094081"])

var svg = d3.select(".replacehere")
  .selectAll("svg")
  .data(d3.range(2017, 2019))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
  .selectAll("rect")
  .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(d3.timeFormat("%Y-%m-%d"));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
  .selectAll("path")
  .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("d", pathMonth);

d3.csv("https://gist.githubusercontent.com/batflyer/6b4c82b78e039ad47cad338fe0bbce53/raw/LabTimes.csv", function(error, csv) {
  if (error) throw error;

  var data = d3.nest()
      .key(function(d) { return d.Date; })
      .rollup(function(d) {
	  // Get the difference between the start and end time in minutes
	  var d1 = new Date(d[0].Date + " " + d[0].End);
	  var d2 = new Date(d[0].Date + " " + d[0].Start);
	  var diff = (d1.getTime() - d2.getTime()) / 1000 / 60;
	  return diff
      })
      .object(csv);


  rect.filter(function(d) { return d in data; })
      .attr("fill", function(d) { return color(data[d]); })
    .append("title")
      .text(function(d) { return d + ": " + data[d] + " minutes"; });
});

function pathMonth(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

</script>
