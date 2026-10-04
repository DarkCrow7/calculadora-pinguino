let valorActual = "0";
let valorAnterior = "";
let operador = null;
let operacionCompleta = "";

const pantallaActual = document.getElementById("pantalla");
const pantallaPrevia = document.getElementById("previa");

// Si estamos en Electron, usamos el puente del preload.
const electronAPI = window.electronAPI || null;

function minimizarVentana() {
    if (electronAPI?.minimizarVentana) {
        electronAPI.minimizarVentana();
    }
}

function cerrarVentana() {
    if (electronAPI?.cerrarVentana) {
        electronAPI.cerrarVentana();
        return;
    }

    // Si no es Electron, intentamos cerrar como web normal.
    window.close();
}

function agregarNumero(numero) {
    // Si estaba en error, al tipear volvemos a empezar.
    if (valorActual === "Error") {
        valorActual = "0";
    }

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
        // Ojo: dividir por 0 no existe 😅
        alert("Oye tu, no se puede dividir por 0 bro");
        return null;
    }

    return a / b;
}


function agregarOperacion(simbolo) {
    // Si todavía no escribiste el segundo número, cambiamos de operador nomás.
    if (operador !== null && valorActual === "0") {
        operador = simbolo;
        actualizarPantalla();
        return;
    }

    if (operador !== null) {
        calcular();
    }

    if (valorActual === "Error") {
        return;
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

    if (Number.isNaN(a) || Number.isNaN(b)) {
        valorActual = "Error";
        operador = null;
        valorAnterior = "";
        actualizarPantalla();
        return;
    }

    const resultado = operacion(a, b, operador);

    if (resultado === null) {
        // Mejor mostrar "Error" y listo, así no parece un resultado real.
        operacionCompleta = `${valorAnterior} ${operador} ${valorActual} = Error`;
        valorActual = "Error";
        operador = null;
        valorAnterior = "";
        actualizarPantalla();
        return;
    }

    operacionCompleta = `${valorAnterior} ${operador} ${valorActual} =`;

    valorActual = String(resultado);
    operador = null;
    valorAnterior = "";
    actualizarPantalla();
}

function limpiar() {
    // Limpia todo y deja la calculadora como recién abierta.
    valorActual = "0";
    valorAnterior = "";
    operador = null;
    operacionCompleta = "";
    actualizarPantalla();
}

function eliminar() {
    if (valorActual === "Error") {
        valorActual = "0";
        actualizarPantalla();
        return;
    }

    if (valorActual.length > 1) {
        valorActual = valorActual.slice(0, -1);
    } else {
        valorActual = "0";
    }
    actualizarPantalla();
}

function cambiarSigno() {
    if (valorActual !== "0" && valorActual !== "Error") {
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

if (!electronAPI?.esElectron) {
    document.querySelector('.barra-titulo').style.display = 'none';
}
