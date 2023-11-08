const resultados = {};

// agregar opciones
document.getElementById("agregarOpcion").addEventListener("click", function() {
    const opcionInput = document.getElementById("opcion");
    const opcion = opcionInput.value.trim();

    if (opcion) {
        const listaOpciones = document.getElementById("listaOpciones");
        const nuevaOpcion = document.createElement("li");
        nuevaOpcion.textContent = opcion;
        listaOpciones.appendChild(nuevaOpcion);

        opcionInput.value = "";
    }
});

// generar la encuesta
document.getElementById("generarEncuesta").addEventListener("click", function() {
    const pregunta = document.getElementById("pregunta").value;
    const opciones = document.getElementById("listaOpciones").getElementsByTagName("li");
    
    let encuestaHTML = "<h2>" + pregunta + "</h2>";
    encuestaHTML += "<form id='encuestaFormulario'>";

    for (let i = 0; i < opciones.length; i++) {
        const opcion = opciones[i].textContent;
        encuestaHTML += '<input type="radio" name="respuesta" value="' + opcion + '"> ' + opcion + '<br>';
        resultados[opcion] = 0;
    }

    encuestaHTML += '<button type="submit">Enviar Encuesta</button></form>';
    document.getElementById("encuestaGenerada").innerHTML = encuestaHTML;
    document.getElementById("volverARealizarEncuesta").style.display = "none";
    document.getElementById("listaOpciones").innerHTML = "";

    // agregar submit después de generar el formulario
    document.getElementById("encuestaFormulario").addEventListener("submit", function(event) {
        event.preventDefault();
        const respuestaElegida = document.querySelector('input[name="respuesta"]:checked');

        if (respuestaElegida) {
            const opcionSeleccionada = respuestaElegida.value;
            resultados[opcionSeleccionada]++;
            mostrarResultados();
        }
    });
});

// mostrar resultados
function mostrarResultados() {
    let resultadosHTML = "<h2>Resultados de la Encuesta</h2>";
    resultadosHTML += "<ul>";

    for (const opcion in resultados) {
        resultadosHTML += "<li>" + opcion + ": " + resultados[opcion] + " votos</li>";
    }

    resultadosHTML += "</ul>";
    document.getElementById("resultados").innerHTML = resultadosHTML;
    document.getElementById("volverARealizarEncuesta").style.display = "block";
}

// volver a realizar la encuesta
document.getElementById("volverARealizarEncuesta").addEventListener("click", function() {
    document.getElementById("encuestaGenerada").innerHTML = "";
    document.getElementById("resultados").innerHTML = "";
    document.getElementById("volverARealizarEncuesta").style.display = "none";
    document.getElementById("listaOpciones").innerHTML = "";
});