var animate = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame 
			|| window.oRequestAnimationFrame 
			|| function(callback) {
				window.setTimeout(callback, 1000 / 60)
			};

var canvas = document.createElement('canvas');
canvas.setAttribute("style",
		"border-radius:10px;" +
		"display: block;")
var width = window.innerWidth - 50;
var height = window.innerHeight - 50;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
	document.getElementById("bspokercontainer").appendChild(canvas);
	animate(step);
}

var step = function() {
	render();
	animate(step);
}

var render = function() {
	context.fillStype = "000000";
	context.fillRect(0, 0, width, height);
}


