let valorActual = "0";
let valorAnterior = "";
let operador = null;
let operacionCompleta = "";

const pantallaActual = document.getElementById("pantalla");
const pantallaPrevia = document.getElementById("previa");

let ipcRenderer;
try {
    ({ ipcRenderer } = require('electron'));
} catch (error) {
    ipcRenderer = null;
}

function minimizarVentana() {
    if (ipcRenderer) {
        ipcRenderer.send('minimizar-ventana');
    }
}

function cerrarVentana() {
    window.close();
}

function agregarNumero(numero) {
    operacionCompleta = "";
    if (valorActual === "0" && numero !== ".") {
        valorActual = numero;
    } else if (numero === "." && valorActual.includes(".")) {
        return;
    } else {
        valorActual += numero;
    }
    actualizarPantalla();
}

function actualizarPantalla() {
    pantallaActual.textContent = valorActual;
    if (operador) {
        pantallaPrevia.textContent = `${valorAnterior} ${operador}`;
    } else if (operacionCompleta) {
        pantallaPrevia.textContent = operacionCompleta;
    } else {
        pantallaPrevia.textContent = "";
    }
}

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        alert("Oye tu, no se puede dividir por 0 bro");
        return 0;
    }
    return a / b;
}


function agregarOperacion(simbolo) {
    if (operador !== null) {
        calcular();
    }
    valorAnterior = valorActual;
    operador = simbolo;
    valorActual = "0";
    actualizarPantalla();
}

function operacion(a, b, simbolo) {
    switch (simbolo) {
        case "+":
            return sumar(a, b);
        case "-":
            return restar(a, b);
        case "*":
            return multiplicar(a, b);
        case "/":
            return dividir(a, b);
        default:
            return b;
    }
}

function calcular() {
    if (operador === null || valorAnterior === "") return;

    const a = parseFloat(valorAnterior);
    const b = parseFloat(valorActual);
    const resultado = operacion(a, b, operador);
    operacionCompleta = `${valorAnterior} ${operador} ${valorActual} =`;

    valorActual = String(resultado);
    operador = null;
    valorAnterior = "";
    actualizarPantalla();
}

function limpiar() {
    valorActual = "0";
    valorAnterior = "";
    operador = null;
    actualizarPantalla();
}

function eliminar() {
    if (valorActual.length > 1) {
        valorActual = valorActual.slice(0, -1);
    } else {
        valorActual = "0";
    }
    actualizarPantalla();
}

function cambiarSigno() {
    if (valorActual !== "0") {
        valorActual = String(parseFloat(valorActual) * -1);
        actualizarPantalla();
    }
}

document.addEventListener("keydown", function (evento) {
    switch (evento.key) {
        case "1":
            agregarNumero("1");
            break;
        case "2":
            agregarNumero("2");
            break;
        case "3":
            agregarNumero("3");
            break;
        case "4":
            agregarNumero("4");
            break;
        case "5":
            agregarNumero("5");
            break;
        case "6":
            agregarNumero("6");
            break;
        case "7":
            agregarNumero("7");
            break
        case "8":
            agregarNumero("8");
            break;
        case "9":
            agregarNumero("9");
            break;
        case "0":
            agregarNumero("0");
            break;
        case ".":
            agregarNumero(".");
            break;
        case "+":
            agregarOperacion("+");
            break;
        case "-":
            agregarOperacion("-");
            break;
        case "*":
            agregarOperacion("*");
            break;
        case "/":
            agregarOperacion("/");
            break;
        case "Enter":
        case "=":
            calcular();
            break;
        case "Backspace":
            eliminar();
            break;
        case "Escape":
            limpiar();
            break;
    }
});

if (!ipcRenderer) {
    document.querySelector('.barra-titulo').style.display = 'none';
}