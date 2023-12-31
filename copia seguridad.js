// Variable global para almacenar el contador de carpetas
//utilizar variables de arreglos para las carpetas
let nomCarpetas = [];
let nomFotos = [];
let descripciones = [];

// Ruta local de la carpeta que deseas contar
const ruta = './modelos';

// Función para contar carpetas y fotos
async function contarCarpetas() {
  try {
    const response = await fetch(ruta);

    if (!response.ok) {
      throw new Error('Error al obtener la lista de archivos.');
    }

    const data = await response.text();

    // Convertir la respuesta en un documento HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    // Obtener una lista de elementos <a> que representan carpetas
    const nombresCarpetas = doc.querySelectorAll('span.name');
    nombresCarpetas.forEach((element, index) => {
      if (element.innerText !== '..') {
        nomCarpetas.push(element.innerText);
      }
    });
    // Iterar sobre las carpetas para contar las fotos
    for (let index = 0; index < nomCarpetas.length; index++) {
      const nuevaRuta = ruta + '/' + nomCarpetas[index];
      const nomRutas = ruta + '/' + nomCarpetas[index] + '/Descripcion.txt'
      try {
        const reta = await fetch(nuevaRuta);
        const res = await fetch(nomRutas);
        const content = await res.text();
        descripciones.push(content);

        if (!reta.ok) {
          throw new Error('Error al obtener la lista de archivos.');
        }

        const data2 = await reta.text();

        // Convertir la respuesta en un documento HTML
        const parser2 = new DOMParser();
        const docu = parser2.parseFromString(data2, 'text/html');
        // Obtener una lista de elementos <a> que representan fotos
        const nombres = docu.querySelectorAll('span.name');
        nombres.forEach((element) => {
          if (element.innerText !== '..' && element.innerText !== 'Descripcion.txt') {
            nomFotos.push(index + '|' + element.innerText);
          }
        });

      } catch (error2) {
        console.error('Error al contar fotos:', error2);
      }
    }
    // Llamar a otra función que utiliza el contador de carpetas
    CargarHtml(nomCarpetas.length);
  } catch (error1) {
    console.error('Error al contar carpetas:', error1);
  }
}

// Llamar a la función para contar carpetas cuando se cargue la página
window.onload = contarCarpetas;

//async function contarCarpetas(){
function CargarHtml(ttCarpeta) {

  //obtener_LocalStorage()
  const modelos = document.getElementById("modelos");
  //Crear carrouseles
  for (let i = 0; i < ttCarpeta; i++) {

    //Creacion de carousel
    const carousel = document.createElement("div");
    carousel.id = "carouselExample_" + i;
    carousel.className = "carousel slide carousel-fade";
    carousel.addEventListener('slid.bs.carousel', function () {
      pasarPagina(i);
    });
    const carousel_inner = document.createElement("div");
    carousel_inner.className = "carousel-inner";
    carousel_inner.id = i;
    carousel_inner.addEventListener('click', function () {
      seleccionarModelo(i);
    })


    var x = 0
    nomFotos.forEach(element => {

      var nombreFoto = element.split('|');

      if (parseInt(nombreFoto[0]) === i) {
        var item = document.createElement("div");
        if (x == 0) {
          item.className = "carousel-item active";
        } else {
          item.className = "carousel-item";
        }
        x = 1;
        var foto = document.createElement("img");
        var sruta = ruta + '/' + nomCarpetas[i] + '/' + nombreFoto[1];
        foto.src = sruta;
        foto.className = "d-block";
        foto.alt = nombreFoto[1];
        foto.setAttribute("width", "200px");
        foto.setAttribute("height", "250px");
        item.appendChild(foto);
        carousel_inner.appendChild(item);
      }

    });

    carousel.appendChild(carousel_inner);

    const buttonprev = document.createElement("button");
    buttonprev.className = "carousel-control-prev";
    buttonprev.type = "button";
    buttonprev.setAttribute("data-bs-target", "#carouselExample_" + i);
    buttonprev.setAttribute("data-bs-slide", "prev");
    const control_span = document.createElement("span");
    control_span.className = "carousel-control-prev-icon";
    control_span.setAttribute("aria-hidden", "true");
    const control_span2 = document.createElement("span");
    control_span2.className = "visually-hidden";
    control_span2.innerText = "Previous";

    control_span.appendChild(control_span2);
    buttonprev.appendChild(control_span);
    carousel.appendChild(buttonprev);

    const buttonnext = document.createElement("button");
    buttonnext.className = "carousel-control-next";
    buttonnext.type = "button";
    buttonnext.setAttribute("data-bs-target", "#carouselExample_" + i);
    buttonnext.setAttribute("data-bs-slide", "next");
    const control_span3 = document.createElement("span");
    control_span3.className = "carousel-control-next-icon";
    control_span3.setAttribute("aria-hidden", "true");
    const control_span4 = document.createElement("span");
    control_span4.className = "visually-hidden";
    control_span4.innerText = "Next";

    control_span3.appendChild(control_span4);
    buttonnext.appendChild(control_span3);
    carousel.appendChild(buttonnext);

    modelos.appendChild(carousel);

    //guardar_localStorage(ttCarpeta,[1,1,1]);
  }
}

function obtener_LocalStorage() {

  if (localStorage.getItem("datos")) {

    let galeria = JSON.parse(localStorage.getItem("datos"));

    console.log(galeria);
  } else {
    console.log('no hay entrada de local storage');
  }

}

function guardar_localStorage(cant, pos) {
  let galeria = {
    Cant_Galerias: cant,
    posiciones: pos,
  }

  localStorage.setItem("datos", JSON.stringify(galeria));
}

function pasarPagina(galeria) {
  // Convierte el número en una cadena
  const galeriaString = galeria.toString();

  const idCarrusel = 'carouselExample_' + galeriaString;
  // Busca el carrusel activo utilizando el ID construido
  const carruselActivo = document.querySelector(`#${idCarrusel}.carousel`);

  if (carruselActivo) {
    // Encontrar el elemento "carousel-item" activo dentro del carrusel
    const itemActivo = carruselActivo.querySelector('.carousel-item.active');

    if (itemActivo) {
      // Encontrar la imagen "img" dentro del elemento "carousel-item" activo
      const imagenActiva = itemActivo.querySelector('img');

      if (imagenActiva) {
        // Hacer algo con la imagen activa (por ejemplo, acceder a su atributo src)
        //img = imagenActiva.src;
      } else {
        console.error('No se encontró ninguna imagen en el elemento activo del carrusel.');
      }
    } else {
      console.error('No se encontró ningún elemento activo en el carrusel.');
    }
  } else {
    console.error('No se encontró ningún carrusel con el ID especificado.');
  }
}

//problema de lanzamiento , descripciones se cargan erroneamente

function seleccionarModelo(carousel) {
  let rutaImagen = ""
  let i = parseInt(carousel)
  let texto = descripciones[i];
  document.querySelector('.texto-d').innerHTML = texto;
  let todos = document.querySelectorAll('.carousel-inner');
  todos.forEach((element, index) => {
    if (index === i) {
      element.style.cssText = 'border: 1px solid white;';
    } else {
      element.style.cssText = 'border: 1px solid rgb(201, 100, 128);';
    }
  });

  //descular imagen
  let fotos = document.querySelectorAll('.carousel-item.active');
  fotos.forEach(element => {
      const padre = element.parentNode;
      if(i === parseInt(padre.id)){
        const url = element.children;
        rutaImagen = url[0].src;
      }
  });

  //crear html temporal
  const divTemporal = document.createElement('div');
  //divTemporal.className = 'imgGuardar';
  divTemporal.style.display = 'none';
  const imgTemporal = document.createElement('img');
  imgTemporal.alt = 'img-temp';
  imgTemporal.src = rutaImagen;

  const pTemporal = document.createElement('p');
  pTemporal.innerText = texto;

  divTemporal.appendChild(imgTemporal);
  divTemporal.appendChild(pTemporal);

  document.body.appendChild(divTemporal);

  const contenidoHTML = divTemporal.innerHTML;

  // Crear un Blob a partir del contenido HTML
  const blob = new Blob([contenidoHTML], { type: "text/html" });
  const itemHTML = new ClipboardItem({ "text/html": blob });

  // Copiar el archivo HTML al portapapeles
  navigator.clipboard.write([itemHTML])
      .then(function() {
          console.log("Archivo HTML copiado al portapapeles.");
      })
      .catch(function(err) {
          console.error("Error al copiar el archivo HTML: ", err);
      });

      document.body.removeChild(divTemporal);
};

