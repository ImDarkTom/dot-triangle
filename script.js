console.log("               /\\               \n              /__\\              \n             /\\  /\\             \n            /__\\/__\\            \n           /\\      /\\           \n          /__\\    /__\\          \n         /\\  /\\  /\\  /\\         \n        /__\\/__\\/__\\/__\\        \n       /\\              /\\       \n      /__\\            /__\\      \n     /\\  /\\          /\\  /\\     \n    /__\\/__\\        /__\\/__\\    \n   /\\      /\\      /\\      /\\   \n  /__\\    /__\\    /__\\    /__\\  \n /\\  /\\  /\\  /\\  /\\  /\\  /\\  /\\ \n/__\\/__\\/__\\/__\\/__\\/__\\/__\\/__\\");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Calculate the starting points for the triangle
const size = Math.min(canvas.width, canvas.height) / 1.2;
const startX = canvas.width / 2;
const startY = canvas.height / 2 + size / (2 * Math.sqrt(11));


// Draw the initial triangle
const x1 = startX;
const y1 = startY - size / Math.sqrt(3);
const x2 = startX - size / 2;
const y2 = startY + size * Math.sqrt(3) / 2 - size / Math.sqrt(3);
const x3 = startX + size / 2;
const y3 = startY + size * Math.sqrt(3) / 2 - size / Math.sqrt(3);

// Generate random barycentric coordinates
const r1 = Math.random();
const r2 = Math.random() * (1 - r1);

// Calculate coordinates of random point
let start_vertices = [[x1, y1], [x2, y2], [x3, y3]];
let start_vertex = start_vertices[Math.floor(Math.random() * start_vertices.length)];

let x = ((x1 + r1 * (x2 - x1) + r2 * (x3 - x1)) + start_vertex[0]) / 2;
let y = ((y1 + r1 * (y2 - y1) + r2 * (y3 - y1)) + start_vertex[1]) / 2;

let delay = 1000;
let counter = 0;

const color = chroma.random().saturate(2);

// Iteratively add points halfway between the current dot and a uniformly randomly chosen vertex
function addDot() {
    const vertices = [[x1, y1], [x2, y2], [x3, y3]];
    const vertex = vertices[Math.floor(Math.random() * vertices.length)];

    const mx = (x + vertex[0]) / 2;
    const my = (y + vertex[1]) / 2;

    const newcolor = chroma.hsl((color.hsl()[0] + Math.random() * 36) % 360, 1, 0.5).hex();

    ctx.beginPath();
    ctx.arc(mx, my, 1, 0, 2 * Math.PI);
    
    ctx.fillStyle = newcolor;
    ctx.fill();

    counter++;
    document.title = `${counter} Dots`

    // Update current dot to be the new midpoint
    x = mx;
    y = my;

    if(delay!=0){delay = Math.floor(Math.max(delay * 0.9, 0));}

    // Use setTimeout to add a delay before adding the next dot
    setTimeout(addDot, delay);
}

// Use setTimeout to add a delay before adding the first dot
document.documentElement.style.setProperty("--dot-color", color.hex());
setTimeout(addDot, 100);