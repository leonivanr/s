// UI Colors
const canvasBorderColor = 'darkgreen';
const canvasBackgroundColor = 'orange';
const snakeBorderColor = 'black';
const snakeBackgroundColor = 'brown';
let snake = [{
        x: 150,
        y: 150
    },
    {
        x: 140,
        y: 150
    },
    {
        x: 130,
        y: 150
    },
    {
        x: 120,
        y: 150
    }, 
    {
        x: 110,
        y: 150
    },
]

// Obtener canvas.
var canvasGame = document.querySelector('#gameCanvas');

// Setear a 2d.
var canSnake = canvasGame.getContext('2d');

//Seteamos el color.
canSnake.fillStyle = canvasBackgroundColor;
// Seteamos el borde.
canSnake.strokeStyle = canvasBorderColor;

// Dibujar 
canSnake.fillRect(0, 0, canvasGame.width, canvasGame.height);
canSnake.strokeRect(0, 0, canvasGame.width, canvasGame.height);


dibujarSerpiente();

//Dibujamos un rectangulo por cada par de coordenadas - cuerpo de snake.
function dibujarCuerpoSerpiente(snakeCuerpo) {
    // Damos color y borde a nuestra serpiente.
    canSnake.fillStyle = snakeBackgroundColor ;
    canSnake.StrokeStyle = snakeBorderColor ;
    
    // Dibujamos con las coordenadas que tomamos de snakeCuerpo.
    canSnake.fillRect(snakeCuerpo.x, snakeCuerpo.y,10,10);
    canSnake.strokeRect(snakeCuerpo.x, snakeCuerpo.y, 10, 10);
}

//
function dibujarSerpiente() {
    snake.forEach(dibujarCuerpoSerpiente);
}