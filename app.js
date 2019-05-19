// UI Colors
const canvasBorderColor = 'darkgreen';
const canvasBackgroundColor = 'orange';
const snakeBorderColor = 'black';
const snakeBackgroundColor = 'brown';
// Definimos donde inicia la serpiente.
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

let comidaX;
let comidaY;

// Velocidad a la que se mueve.
let dx = 10;
let dy = 0;

// Obtener canvas.
var canvasGame = document.querySelector('#gameCanvas');

// Setear a 2d.
var canSnake = canvasGame.getContext('2d');

//Seteamos el color.
canSnake.fillStyle = canvasBackgroundColor;
// Seteamos el borde.
canSnake.strokeStyle = canvasBorderColor;
// Inicio del juego.
main();

generarComida();

addEventListener('keydown', cambiarDireccion);


function main() {
    setTimeout(function onTick() {
        limpiarLienzo();
        dibujarComida();
        moverSerpiente();
        dibujarSerpiente();

        main();
    }, 100)
}

// Limpiamos el lienzo, para eliminiar los rastros dejados por la serpiente.
function limpiarLienzo() {

    canSnake.fillStyle = 'orange';
    canSnake.strokeStyle = 'darkgreen';

    canSnake.fillRect(0, 0, canvasGame.width, canvasGame.height);
    canSnake.strokeRect(0, 0, canvasGame.width, canvasGame.height);

}
//Dibujamos un rectangulo por cada par de coordenadas - cuerpo de snake.
function dibujarCuerpoSerpiente(snakeCuerpo) {
    // Damos color y borde a nuestra serpiente.
    canSnake.fillStyle = snakeBackgroundColor;
    canSnake.StrokeStyle = snakeBorderColor;

    // Dibujamos con las coordenadas que tomamos de snakeCuerpo.
    canSnake.fillRect(snakeCuerpo.x, snakeCuerpo.y, 10, 10);
    canSnake.strokeRect(snakeCuerpo.x, snakeCuerpo.y, 10, 10);
}
//
function dibujarSerpiente() {
    snake.forEach(dibujarCuerpoSerpiente);
}

function cambiarDireccion(e) {
    const flechaDerecha = 39;
    const flechaIzquierda = 37;
    const flechaArriba = 38;
    const flechaAbajo = 40;

    const teclaPresionada = e.keyCode;
    //NOTE: Verificar si va a quedar sin reverso.
    const moverDerecha = dx === 10;
    const moverIzquierda = dx === -10;
    const moverArriba = dy === -10;
    const moverAbajo = dy === 10;

    if (teclaPresionada === flechaDerecha) {
        dx = 10;
        dy = 0;
    }
    if (teclaPresionada === flechaArriba) {
        dx = 0;
        dy = -10;
    }
    if (teclaPresionada === flechaIzquierda) {
        dx = -10;
        dy = 0;
    }
    if (teclaPresionada === flechaAbajo) {
        dx = 0;
        dy = 10;
    }

}

function moverSerpiente() {
    //Creo una nueva cabeza para la serpiente.
    const cabeza = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    // Inserto la nueva cabeza al principio del array.
    snake.unshift(cabeza);
    // Elimino el ultimo elemento del array - la cola.
    snake.pop()
}

function generarAzar(minimo, maximo) {
    return Math.round((Math.random() * (maximo - minimo) + minimo) / 10) * 10;
    }

function generarComida() {
    comidaX = generarAzar(0, canvasGame.width - 10);
    comidaY = generarAzar(0, canvasGame.height - 10);
    console.log(comidaX);
    console.log(comidaY);
    
    snake.forEach(function laComidaSeCreaEnLaSerpiente(parte) {
        if (comida = parte.x == comidaX && parte.y == comidaY) {
            generarComida();
        }
    })
}

function dibujarComida() {
    canSnake.fillStyle = 'blue';
    canSnake.strokeStyle = 'black';

    
    canSnake.fillRect(comidaX, comidaY, 10, 10);
    canSnake.strokeRect(comidaX, comidaY, 10, 10);

}