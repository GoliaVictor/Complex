// Testing

let v1 = Complex.cartesian(-2, 2)
let v2 = Complex.modArg(3, 4)
let v3 = Complex.cartesian(-2, -2)

vectors = [v1, v2, v3]

function setup() {
    createCanvas(600, 600)
}

function draw() {
    background(50)
    translate(300, 300)
    scale(1, -1)

    stroke(255, 255, 255, 100)
    strokeWeight(2)
    for (let n = 0; n < vectors.length; n++) {
        line(0, 0, vectors[n].re*10, vectors[n].im*10)
    }
}