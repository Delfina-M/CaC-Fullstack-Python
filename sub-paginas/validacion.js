
//----------------------------------------------------
//Validar nombre y apellido
//--------------------------------------------------

function validarEnviar() {

    if (document.contacto.apellido.value.length <= 2) {
        alert("Debe escribir su apellido");
        document.contacto.apellido.focus();
        return;
    }

    if (document.contacto.nombre.value.length <= 2) {
        alert("Debe escribir su nombre"); document.contacto.nombre.focus();
        return;
    }


    //----------------------------------------------------
    //Validar DNI
    //--------------------------------------------------

    let dni = document.contacto.dni.value;
    dni = validarEntero(dni);
    document.contacto.dni.value = dni;

    if (dni == "") {
        alert("El campo DNI/PASP/CI no puede contener menos de 8 dígitos");
        document.contacto.dni.focus();
        return;
    } 
    else {
        if (dni < 10000000 || dni >= 100000000) {
            alert("El número ingresado no es válido");
            document.contacto.dni.focus();
            return;
        }
    }

    alert("Su consulta ha sido enviada. Muchas gracias por contactarse con nosotros.")
    document.contacto.submit()
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