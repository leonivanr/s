// UI Colors
const canvasBorderColor = 'darkgreen';
const canvasBackgroundColor = 'green';
const snakeBorderColor = 'black';
const snakeBackgroundColor = 'brown';
const obtPuntaje = document.querySelector('#puntaje');
const jugarBtn = document.querySelector('.jugar');
// Velocidad inicial;
let speed = 100;
//Puntaje inicial.
let puntaje = 0;
// Definimos donde inicia la serpiente.
let snake = [{
        x: 50,
        y: 150
    },
    {
        x: 40,
        y: 150
    },
    {
        x: 30,
        y: 150
    },
    {
        x: 20,
        y: 150
    },
    {
        x: 10,
        y: 150
    },
]

// Ejes de donde aparece la comida.
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

// Iniciar con boton
jugarBtn.addEventListener('click', iniciarJuego);
// Iniciar con Enter
window.addEventListener('keyup', function (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
        iniciarJuego();
    }
});
// Escucho las teclas presionadas.
addEventListener('keydown', cambiarDireccion);

function main() {
    if (colisionSerpiente()) {
        juegoAcabado();
        return
    };

    setTimeout(function onTick() {
        limpiarLienzo();
        dibujarComida();
        moverSerpiente();
        dibujarSerpiente();
        // Vuelvo a llamar, para que se mueva constantemente.
        main();
        // TODO: Agregar selector para ir agregando velocidad.
    }, speed)
}
// Limpiamos el lienzo, para eliminiar los rastros dejados por la serpiente.
function limpiarLienzo() {

    canSnake.fillStyle = canvasBackgroundColor;
    canSnake.strokeStyle = canvasBorderColor;

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
    const yendoDerecha = dx === 10;
    const yendoIzquierda = dx === -10;
    const yendoArriba = dy === -10;
    const yendoAbajo = dy === 10;
    // 
    if (teclaPresionada === flechaDerecha && !yendoIzquierda) {
        dx = 10;
        dy = 0;
    }
    if (teclaPresionada === flechaArriba && !yendoAbajo) {
        dx = 0;
        dy = -10;
    }
    if (teclaPresionada === flechaIzquierda && !yendoDerecha) {
        dx = -10;
        dy = 0;
    }
    if (teclaPresionada === flechaAbajo && !yendoArriba) {
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
    // Si la cabeza de la serpiente toca la comida, la agrego.
    const tocoComida = snake[0].x === comidaX && snake[0].y === comidaY;
    if (tocoComida) {
        puntaje += 10;
        obtPuntaje.innerHTML = puntaje;
        generarComida();
    } else {
        snake.pop();
    }


    // Elimino el ultimo elemento del array (la cola).

}

function generarAzar(minimo, maximo) {
    return Math.round((Math.random() * (maximo - minimo) + minimo) / 10) * 10;
}

function generarComida() {
    comidaX = generarAzar(0, canvasGame.width - 10);
    comidaY = generarAzar(0, canvasGame.height - 10);
    snake.forEach(function laComidaSeCreaEnLaSerpiente(parte) {
        if (comida = parte.x == comidaX && parte.y == comidaY) {
            generarComida();
        }
    })
}

function dibujarComida() {
    canSnake.fillStyle = 'red';
    canSnake.strokeStyle = 'black';


    canSnake.fillRect(comidaX, comidaY, 10, 10);
    canSnake.strokeRect(comidaX, comidaY, 10, 10);

}

function colisionSerpiente() {
    // Chequeo si se choca consigo misma.
    // Empiezo en [4], por que es imposible que se choque con solo 4 partes.
    for (let i = 4; i < snake.length; i++) {
        // Snake[0] es la cabeza, por lo tanto nunca cambia.
        const haChocado = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (haChocado) return true;
    }
    // Chequeo si choca contra las paredes.
    const chocaParedIzquierda = snake[0].x < 0;
    const chocaParedDerecha = snake[0].x > canvasGame.width - 10;
    const chocaParedArriba = snake[0].y < 0;
    const chocaParedAbajo = snake[0].y > canvasGame.height - 10;

    return chocaParedAbajo || chocaParedArriba || chocaParedDerecha || chocaParedIzquierda;
}

function iniciarJuego() {
    const jugar = document.querySelector('#jugar-on');
    const opciones = document.querySelector('#opciones');
    opciones.style.display = "none";
    jugar.style.display = "block";
    // Inicio del juego.
    main();
    // Genero comida para la primera vez. 
    generarComida();
    
}

function juegoAcabado() {
    const fondo = document.querySelector('body');
    const titulo = document.querySelector('#titulo-juego');
    const puntaje = document.querySelector('#titulo-puntaje');
    fondo.style.backgroundColor = 'orange';
    puntaje.style.display = 'block';
    titulo.textContent = 'PERDISTE';
}
