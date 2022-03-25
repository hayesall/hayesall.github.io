// Copyright © 2021 Alexander L. Hayes
// MIT License

class Graph {

  constructor(height, width) {
    this.canvas = document.querySelector("#dataCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = height;
    this.canvas.width = width;

    this.x_data = [];
    this.y_data = [];
    this.class_labels = [];

    this.initialize_graph_paper();
  }

  export_as_numpy() {

    var output = "";

    // Check if every class_label is the same
    var allEqual = this.class_labels.every((val, i, arr) => val === arr[0]);

    if (allEqual) {
      output += "X = np.array([";
      output += this.x_data.map(x => x.toPrecision(3));
      output += "]).reshape(-1, 1)\ny = np.array([";
      output += this.y_data.map(x => x.toPrecision(3));
      output += "]).reshape(-1, 1)\n"
    } else {
      output += "X = np.array([[";
      output += this.x_data.map(x => x.toPrecision(3));
      output += "],[";
      output += this.y_data.map(x => x.toPrecision(3));
      output += "]]).reshape(-1, 2)\n";
      output += "y = np.array([";
      output += this.class_labels;
      output += "])\n";
    }
    return output;
  }

  export_as_pandas() {

    var output = "";

    // Check if every class_label is the same
    var allEqual = this.class_labels.every((val, i, arr) => val === arr[0]);

    if (allEqual) {
      output += "data = pd.DataFrame({\n";
      output += "   'x': [" + this.x_data.map(x => x.toPrecision(3));
      output += "],\n"
      output += "   'y': [" + this.y_data.map(x => x.toPrecision(3));
      output += "],\n})\n";
    } else {
      output += "data = pd.DataFrame({\n";
      output += "   'x0': [" + this.x_data.map(x => x.toPrecision(3));
      output += "],\n"
      output += "   'x1': [" + this.y_data.map(x => x.toPrecision(3));
      output += "],\n"
      output += "   'y': [" + this.class_labels;
      output += "],\n})\n";
    }
    return output;
  }

  initialize_graph_paper() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(0, this.canvas.height/2);
    this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
    this.ctx.moveTo(this.canvas.width/2, 0);
    this.ctx.lineTo(this.canvas.width/2, this.canvas.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  add_point(x, y, label) {
    this.x_data.push(x);
    this.y_data.push(y);
    this.class_labels.push(label);
  }

  reset() {
    this.x_data = [];
    this.y_data = [];
    this.class_labels = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.initialize_graph_paper();
    outputArea.value = "";
  }
}

var pointSize = 5;

var graph = new Graph(500, 500);

const label_colors = {
  // TODO(hayesall): Should be a list, but easier to reorder this way.
  0 : "#377eb8",
  1 : "#ff7f00",
  2 : "#4daf4a",
  3 : "#f781bf",
  4 : "#a65628",
  5 : "#984ea3",
  6 : "#999999",
  7 : "#e41a1c",
  8 : "#dede00"
};

window.addEventListener("load", () => {

  function getPosition(e){

    if (typeof e === 'object') {
      switch (e.button) {
        case 0:
          // Left Click
          var rect = dataCanvas.getBoundingClientRect();
          var x = event.clientX - rect.left;
          var y = event.clientY - rect.top;

          // TODO(hayesall): normalized variables should depend on size of the canvas
          let x_normalized = (x - 250) / 250;
          let y_normalized = (y - 250) / 250 * -1;

          graph.add_point(x_normalized, y_normalized, current_label.value);
          drawCoordinates(x, y);

          break;
        default:
          // Ignore middle and right click.
      }
    }
  }

  function drawCoordinates(x, y) {
    	var ctx = document.getElementById("dataCanvas").getContext("2d");
    	ctx.fillStyle = label_colors[current_label.value];
      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
  }

  dataCanvas.addEventListener('mousedown', getPosition);

});
