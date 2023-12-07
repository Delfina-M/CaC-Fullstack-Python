// La validación realizada con el EventListener no estaba funcionando, simplemente se recargaba la página al clickear enviar sin datos.
// Error que mostraba la consola ------> validacion.js:3 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
// at validacion.js:3:36 ------- la línea 3 es: document.getElementById("contacto").addEventListener("submit", function(event), supongo 
// que null debía ser el elemento "contacto" que al no estar cargado todo el DOM no existiría y por eso daba q es null y no puede leer 
// las propiedades ?!?!?!
// Explicación chatGPT -------->  Esto probablemente se debe a que estás intentando agregar un event listener a un elemento que no se 
// encuentra en el momento en que el script se está ejecutando. Asegúrate que tu script se esté ejecutando después de que el DOM esté 
// completamente cargado. Puedes envolver tu código en un evento DOMContentLoaded para asegurarte de que se ejecute después de que la 
// página esté completamente cargada. 

document.addEventListener("DOMContentLoaded", function () {

    const URL = "http://127.0.0.1:5000/"

    document.getElementById("contacto").addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validar()) { return; }

        let valorInscripto = document.getElementsByName("inscripto");
        let inscripto = "";

        for (let i = 0; i < valorInscripto.length; i++) {
            if (valorInscripto[i].checked) {
                inscripto = valorInscripto[i].value;
                break;
            }
        }

        let formData = new FormData();
        formData.append("apellido", document.getElementById("apellido").value);
        formData.append("nombre", document.getElementById("nombre").value);
        formData.append("inscripto", inscripto);
        formData.append("dni", document.getElementById("dni").value);
        formData.append("mail", document.getElementById("mail").value);
        formData.append("consulta", document.getElementById("consulta").value);
        formData.append("suscripcion", document.getElementById("suscripcion").checked);

        fetch(URL + "contacto", {
            method: "POST",
            body: formData
        })
            .then(function (response) {
                if (response.ok) { return response.json(); }
            })
            .then(function (data) {
                alert("Su consulta ha sido enviada. Muchas gracias por contactarse con nosotros.");
                document.getElementById("contacto").reset();
            })
            .catch(function (error) {
                alert("Su consulta no pudo ser enviada.")
            });
    })
});

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
