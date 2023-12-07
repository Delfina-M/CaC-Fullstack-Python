const URL = "http://127.0.0.1:5000/"

function mostrarListado(titulo, opcion) {

    fetch(URL + "consultas")
        .then(function (response) {
            if (response.ok) { return response.json(); }
        })
        .then(function (data) {
            document.getElementById("contenedor").style.display = "block";
            document.getElementById("titulo").innerHTML = titulo;
            if (opcion === 2) {
                document.getElementById("contenido").innerHTML =
                    `<table class="tabla-consultas">
                    <thead> 
                        <tr> 
                            <th>Código</th>
                            <th>Apellido/s</th>
                            <th>Nombre/s</th>
                            <th>Inscripto</th>
                            <th>Documento</th>
                            <th>E-mail</th>
                            <th>Consulta</th>
                            <th>Suscripción</th>
                            <th>Respuesta</th>
                            <th><i class="fa-regular fa-pen-to-square fa-lg"></i></th>
                        </tr>
                    </thead>
                    <tbody id="cuerpo-tabla"></tbody>
                </table>`
            } else if (opcion === 3) {
                document.getElementById("contenido").innerHTML =
                    `<table class="tabla-consultas">
                    <thead> 
                        <tr> 
                            <th>Código</th>
                            <th>Apellido/s</th>
                            <th>Nombre/s</th>
                            <th>Inscripto</th>
                            <th>Documento</th>
                            <th>E-mail</th>
                            <th>Consulta</th>
                            <th>Suscripción</th>
                            <th>Respuesta</th>
                            <th><i class="fa-regular fa-trash-can fa-lg"></i></th>
                        </tr>
                    </thead>
                    <tbody id="cuerpo-tabla"></tbody>
                </table>`
            } else {
                document.getElementById("contenido").innerHTML =
                    `<table class="tabla-consultas">
                    <thead> 
                        <tr> 
                            <th>Código</th>
                            <th>Apellido/s</th>
                            <th>Nombre/s</th>
                            <th>Inscripto</th>
                            <th>Documento</th>
                            <th>E-mail</th>
                            <th>Consulta</th>
                            <th>Suscripción</th>
                            <th>Respuesta</th>
                        </tr>
                    </thead>
                    <tbody id="cuerpo-tabla"></tbody>
                </table>`
            };
            let cuerpoTabla = document.getElementById("cuerpo-tabla");

            for (let consulta of data) {
                let fila = document.createElement("tr");
                fila.innerHTML = "<td class='center'>" + consulta.codigo + "</td>" +
                    "<td>" + consulta.apellido + "</td>" +
                    "<td>" + consulta.nombre + "</td>" +
                    "<td class='center'>" + (consulta.inscripto ? "Si" : "No") + "</td>" +
                    "<td class='center'>" + consulta.documento + "</td>" +
                    "<td>" + consulta.email + "</td>" +
                    "<td>" + consulta.pregunta + "</td>" +
                    "<td class='center'>" + (consulta.suscripcion ? "Si" : "No") + "</td>" +
                    "<td class='center'>" + (consulta.respuesta ? "Si" : "No") + "</td>" +
                    (opcion === 2 ? "<td class='center'><i class='fa-solid fa-gear fa-xl' onclick='modificarConsulta(" + consulta.codigo + ")'></i></td>" : opcion === 3 ? "<td class='center'><i class='fa-solid fa-circle-xmark fa-xl' onclick='eliminarConsulta(" + consulta.codigo + ")'></i></td>" : "");
                cuerpoTabla.appendChild(fila);
            }
        })
        .catch(function (error) {
            alert("Error al obtener las consultas.")
        })
};

function eliminarConsulta(codigo) {
    if (confirm("¿Está seguro de que quiere eliminar esta consulta?")) {
        fetch(URL + `consultas/${codigo}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    alert('Consulta eliminada correctamente.');
                    mostrarListado('Baja de consultas', 3)
                }
            })
            .catch(error => {
                alert(error.message);
            });
    }
}

function modificarConsulta(codigo) {

    document.getElementById("contenido").innerHTML =
        `<form name="contacto" id="contacto-mod" enctype="multipart/form-data">
            <div>
                <label for="codigo">Código </label>
                <input type="number" id="codigo" name="codigo" value=${codigo} readonly>
                <br><br>
                <label for="apellido">Apellido/s </label>
                <input type="text" name="apellido" id="apellido">
                <br><br>
                <label for="nombre">Nombre/s </label>
                <input type="text" name="nombre" id="nombre">
                <br><br>
                <fieldset>
                    <input type="radio" name="inscripto" id="si" value="true">
                    <label for="si">Soy Alumno</label>

                    <input type="radio" name="inscripto" id="no" value="false">
                    <label for="no"> Aún no soy Alumno</label>
                </fieldset>
                <br>
                <label for="dni">DNI/PASP/CI </label>
                <input type="number" name="dni" id="dni">
                <br><br>
                <label for="mail">Email </label>
                <input type="email" name="mail" id="mail"> 
            </div>
            <div>
                <textarea name="consulta" id="consulta" cols="50" rows="15"
                    placeholder="¿Cuál es su consulta?" maxlength="600"></textarea>
                <br><br>
                <input type="checkbox" name="suscripcion" id="suscripcion">
                <label for="suscripcion">Quiero suscribirme al newsletter</label>
                <br><br>
                <fieldset>
                    <input type="radio" name="respuesta" id="con" value="true">
                    <label for="con">Se envió respuesta</label>

                    <input type="radio" name="respuesta" id="sin" value="false">
                    <label for="sin">No se envió respuesta</label>
                </fieldset>
                <br>
                <button type="button" onclick="mostrarListado('Modificación de consultas', 2)">Volver</button>
                <button type="button" onclick="modificarConsulta(${codigo})">Deshacer</button>
                <button type="submit">Enviar</button>
            </div>
        </form>`

    iniciarEscuchaSubmit()

    // let validar = document.createElement("script");
    // validar.type = "text/javascript";
    // validar.src = "./validacion_envio.js";

    // if (!checkScripts(validar.src)) {
    //     document.getElementsByTagName("head")[0].appendChild(validar);
    // }

    fetch(URL + `consultas/${codigo}`)
        .then(function (response) {
            if (response.ok) { return response.json(); }
        })
        .then(function (data) {
            document.getElementById("apellido").value = data.apellido;
            document.getElementById("nombre").value = data.nombre;
            data.inscripto === 1 ? document.getElementById("si").checked = true : document.getElementById("no").checked = true;
            document.getElementById("dni").value = data.documento;
            document.getElementById("mail").value = data.email;
            document.getElementById("consulta").value = data.pregunta;
            data.suscripcion === 1 ? document.getElementById("suscripcion").checked = true : document.getElementById("suscripcion").checked = false;
            data.respuesta === 1 ? document.getElementById("con").checked = true : document.getElementById("sin").checked = true;
        })
        .catch(function (error) {
            alert("Error al obtener la consulta.")
        })
}

// function checkScripts(src) {
//     let scriptsAdmin = document.getElementsByTagName("script");
//     for (let i = 0; i < scriptsAdmin.length; i++) {
//         if (scriptsAdmin[i].src === src) {
//             return true;
//         }
//     }
//     return false;
// }

function iniciarEscuchaSubmit() {
    document.getElementById("contacto-mod").addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validar()) { return; };

        let valorInscripto = document.getElementsByName("inscripto");
        let inscripto = ""; // Es necesario inicializar la variable o puedo crearla directamente dentro del for?!?! Probar

        for (let i = 0; i < valorInscripto.length; i++) {
            if (valorInscripto[i].checked) {
                inscripto = valorInscripto[i].value;
                break;
            }
        }

        let valorRespuesta = document.getElementsByName("respuesta");
        let respuesta = "";

        for (let i = 0; i < valorRespuesta.length; i++) {
            if (valorRespuesta[i].checked) {
                respuesta = valorRespuesta[i].value;
                break;
            }
        }

        let codigo = document.getElementById("codigo").value

        let formData = new FormData();
        formData.append("apellido", document.getElementById("apellido").value);
        formData.append("nombre", document.getElementById("nombre").value);
        formData.append("inscripto", inscripto);
        formData.append("dni", document.getElementById("dni").value);
        formData.append("mail", document.getElementById("mail").value);
        formData.append("consulta", document.getElementById("consulta").value);
        formData.append("suscripcion", document.getElementById("suscripcion").checked);
        formData.append("respuesta", respuesta);

        fetch(URL + `consultas/${codigo}`, {
            method: "PUT",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                alert('Consulta modificada correctamente.');
                mostrarListado('Modificación de consultas', 2);
            })
            .catch(error => {
                alert(error.message);
            });
    });
}

function validar() {

    //----------------------------------------------------
    //Validar nombre y apellido
    //----------------------------------------------------

    if (document.contacto.apellido.value.length <= 2) {
        alert("Debe escribir su apellido");
        document.contacto.apellido.focus();
        return false;
    }

    if (document.contacto.nombre.value.length <= 2) {
        alert("Debe escribir su nombre");
        document.contacto.nombre.focus();
        return false;
    }

    //----------------------------------------------------
    //Validar inscripto
    //----------------------------------------------------

    let itemsInscripto = document.getElementsByName("inscripto");
    let seleccion = false;

    for (let i = 0; i < itemsInscripto.length; i++) {
        if (itemsInscripto[i].checked) {
            seleccion = true;
            break;
        }
    }

    if (!seleccion) {
        alert("Por favor, seleccione indique si es alumno o no");
        document.getElementById("si").focus();
        return false;
    }

    //----------------------------------------------------
    //Validar DNI
    //----------------------------------------------------

    let dni = document.contacto.dni.value;
    dni = validarEntero(dni);
    document.contacto.dni.value = dni;

    if (dni == "") {
        alert("El campo DNI/PASP/CI no puede contener menos de 8 dígitos");
        document.contacto.dni.focus();
        return false;
    }
    else {
        if (dni < 10000000 || dni >= 100000000) {
            alert("El número ingresado no es válido");
            document.contacto.dni.focus();
            return false;
        }
    }

    //----------------------------------------------------
    //Validar e-mail
    //----------------------------------------------------

    if (document.contacto.mail.value.length < 5) {
        alert("Debe ingresar un e-mail");
        document.contacto.mail.focus();
        return false;
    }

    //----------------------------------------------------
    //Validar consulta
    //----------------------------------------------------

    if (document.contacto.consulta.value.length <= 5) {
        alert("Debe escribir una consulta");
        document.contacto.consulta.focus();
        return false;
    }

    return true;
}

//----------------------------------------------------
//Parseint para validar numeros
//-------------------------------------------------

function validarEntero(valor) {
    valor = parseInt(valor);

    if (isNaN(valor)) {
        return "";
    }

    else {
        return valor;
    }
}