const alumnas = document.getElementsByClassName("alumna")
const alumnos = document.getElementsByClassName("alumno")

function cargarFoto() {

    fetch('https://randomuser.me/api/?gender=female&results=2&inc=picture')
        .then(datos => datos.json()) 

        .then(datos => {
            alumnas[0].src = datos.results[0].picture.large
            alumnas[1].src = datos.results[1].picture.large
        })
        
    fetch('https://randomuser.me/api/?gender=male&results=2&inc=picture')
        .then(datos => datos.json()) 

        .then(datos => {
            alumnos[0].src = datos.results[0].picture.large
        })
}

window.onload = cargarFoto();