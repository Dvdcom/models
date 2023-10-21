import { copyToClipBoard } from './config/copyToClipBoard.mjs';

// Variable global para almacenar el contador de carpetas
//utilizar variables de arreglos para las carpetas
let nomCarpetas = [];
let nomFotos = [];
let descripciones = [];
let currentIndex = 0;

async function contarCarpetas() {

  try {
    const root = await getPackageDirectoryEntry();

    const modelsDir = await getDirectory(root, './modelos');
    const entries = await readEntries(modelsDir);
    const carpetas = entries.filter(entry => entry.isDirectory);

    for (const element of carpetas) {
      nomCarpetas.push(element.name);

      const newRuta = './modelos/' + element.name;
      const modelosDir = await getDirectory(root, newRuta);
      const fotoEntries = await readEntries(modelosDir);
      const fotos = fotoEntries.filter(entry => entry.isFile);
      const descripcionFile = fotos.find(foto => foto.name === 'Descripcion.txt');

      if (descripcionFile) {
        const contenido = await readFile(descripcionFile);
        descripciones.push(contenido);
      }

      fotos.map(foto => {
        if (foto.name !== 'Descripcion.txt'){
          nomFotos.push(currentIndex + '|' + foto.name);
        }
      });
      currentIndex++;
    }
    // Ahora puedes llamar a otra función que utiliza los resultados
    CargarHtml(carpetas.length);

  } catch (error) {
    console.error('Error al contar carpetas:', error);
  }
}

function getPackageDirectoryEntry() {
  return new Promise((resolve, reject) => {
    chrome.runtime.getPackageDirectoryEntry(root => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(root);
      }
    });
  });
}

function getDirectory(root, path) {
  return new Promise((resolve, reject) => {
    root.getDirectory(path, {}, dir => resolve(dir), reject);
  });
}

function readEntries(directory) {
  return new Promise((resolve, reject) => {
    const reader = directory.createReader();
    reader.readEntries(entries => resolve(entries), reject);
  });
}

function readFile(fileEntry) {
  return new Promise((resolve, reject) => {
    fileEntry.file(function (file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var content = event.target.result;
        resolve(content);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsText(file);
    });
  });
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
        var sruta = './modelos/' + nomCarpetas[i] + '/' + nombreFoto[1];
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

/* pruebas con html y canvas al portapapeles */

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
        console.log(url);
        //rutaImagen = url[0].currentSrc;
        rutaImagen = './modelos/' + nomCarpetas[i] + '/' + url[0].alt; 
      }
  });

  //crear html temporal
  const divTemporal = document.createElement('div');
  divTemporal.className = 'imgGuardar';
  divTemporal.style.display = 'none';
  const imgTemporal = document.createElement('img');
  imgTemporal.alt = 'img-temp';
  imgTemporal.src = rutaImagen;

  const pTemporal = document.createElement('p');
  pTemporal.innerText = texto;

  divTemporal.appendChild(imgTemporal);
  divTemporal.appendChild(pTemporal);
  document.body.appendChild(divTemporal);

  divTemporal.contentEditable = true;

  //Esperar a que la imagen se cargue
  imgTemporal.onload = function () {

  copyToClipBoard(divTemporal)
    .then(() => {
      console.log('✅ it worked ! ("Ctrl/Cmd + V" to paste it)')
    })
    .catch(e => {
      console.log('❌ something went wrong', e);
    });

  // Eliminar el div temporal una vez que se haya copiado
  document.body.removeChild(divTemporal);
  };

  
}


//https://gist.github.com/gangsthub/a4d873e5a450ca4681364e230498710b