const canvas = document.querySelector("#canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight - 250

const X_CENTER = canvas.width / 2
const Y_CENTER = canvas.height / 2

const context = canvas.getContext("2d")

const VERTICES = [
    [0, 0, 30],
    [0, 300, 30],
    [300, 0, 30],
    [300, 300, 30],
    [0, 0, 60],
    [0, 300, 60],
    [300, 0, 60],
    [300, 300, 60],
];

const INDICES = [
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

function degreesToRadians(n) {
    return n * (Math.PI / 180)
}

let adjustedVertices;

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    let focalLength = parseFloat(document.querySelector("#focal").value)
    let cx = parseFloat(document.querySelector("#x").value)
    let cy = parseFloat(document.querySelector("#y").value)

    adjustedVertices = [];

    for (vertex of VERTICES) {
        let coord = [0, 0]
        let xSimpleProj = (focalLength * vertex[0]) / (focalLength + vertex[2])
        let ySimpleProj = (focalLength * vertex[1]) / (focalLength + vertex[2])
        coord[0] = xSimpleProj + cx - ((cx * vertex[2]) / (focalLength + vertex[2])) + X_CENTER
        coord[1] = ySimpleProj + cy - ((cy * vertex[2]) / (focalLength + vertex[2])) + Y_CENTER
        adjustedVertices.push(coord)
    }

    for (let [startIndex, endIndex] of INDICES) {
        context.beginPath();
        context.moveTo(adjustedVertices[startIndex][0], adjustedVertices[startIndex][1]);
        context.lineTo(adjustedVertices[endIndex][0], adjustedVertices[endIndex][1]);
        context.stroke();
    }
}

update()