const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 250;

const X_CENTER = canvas.width / 2;
const Y_CENTER = canvas.height / 2;

context.fillStyle = "black";
context.strokeStyle = "white";

let VERTICES = [
    [0, 0, 30],
    [0, 300, 30],
    [300, 0, 30],
    [300, 300, 30],
    [0, 0, 60],
    [0, 300, 60],
    [300, 0, 60],
    [300, 300, 60],
];

let INDICES = [
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [0, 4],
    [1, 5],
    [3, 7],
    [2, 6],
];

var projectedVertices = [];

function updateCanvas() {

    projectedVertices = [];

    context.clearRect(0, 0, canvas.width, canvas.height)

    var focalLength = parseFloat(document.querySelector("#focal").value)
    var cameraX = parseFloat(document.querySelector("#cx").value)
    var cameraY = parseFloat(document.querySelector("#cy").value)

    for (vertex of VERTICES) {
        let onScreenCoordinate = [0, 0];
        onScreenCoordinate[0] = (focalLength * (vertex[0] - cameraX)) / (focalLength + vertex[2]) + X_CENTER;
        onScreenCoordinate[1] = (focalLength * (vertex[1] - cameraY)) / (focalLength + vertex[2]) + Y_CENTER;
        projectedVertices.push(onScreenCoordinate);
    }

    for (let [startCoordinate, endCoordinate] of INDICES) {
        context.beginPath();
        context.moveTo(projectedVertices[startCoordinate][0], projectedVertices[startCoordinate][1]);
        context.lineTo(projectedVertices[endCoordinate][0], projectedVertices[endCoordinate][1]);
        context.stroke();
    }
}

updateCanvas();