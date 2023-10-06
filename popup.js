// Variable global para almacenar el contador de carpetas
let contadorCarpetas = 0;
let contadorFotos = 0;

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
    const carpetas = doc.querySelectorAll('a.icon-directory');
    
    // Contar las carpetas
    contadorCarpetas = carpetas.length;
    
    // Llamar a otra función que utiliza el contador de carpetas
    CargarHtml(contadorCarpetas);
    
    // Iterar sobre las carpetas para contar las fotos
    for (let index = 1; index < contadorCarpetas; index++) {
      const nuevaRuta = `./modelos/Modelo${index}`;
      
      try {
        const reta = await fetch(nuevaRuta);
        
        if (!reta.ok) {
          throw new Error('Error al obtener la lista de archivos.');
        }
        
        const data2 = await reta.text();
        
        // Convertir la respuesta en un documento HTML
        const parser2 = new DOMParser();
        const docu = parser2.parseFromString(data2, 'text/html');
        // Obtener una lista de elementos <a> que representan fotos
        const fotos = docu.querySelectorAll('a.icon-image');
        const nombres = docu.querySelectorAll('span.name');
        nombres.forEach((element,index) => {
              if (index >1 ){
                console.log(element.innerText)
              }
            });
        // Contar las fotos y sumar al contador global
        contadorFotos = fotos.length;
        console.log('la carpeta ' + nuevaRuta + ' cotiene : ' + contadorFotos + ' fotos.')
      } catch (error) {
        console.error('Error al contar fotos:', error);
      }
    }
    
    
  } catch (error) {
    console.error('Error al contar carpetas:', error);
  }
}

// Llamar a la función para contar carpetas cuando se cargue la página
window.onload = contarCarpetas;

//async function contarCarpetas(){
function CargarHtml(ttCarpeta){

    

  //obtener_LocalStorage()

  const modelos = document.getElementById("modelos");
  //Crear carrouseles
  for (let i = 1; i < ttCarpeta; i++) {

    //Creacion de carousel
    const carousel = document.createElement("div");
    carousel.id = "carouselExample_" + i;
    carousel.className = "carousel slide carousel-fade";
    carousel.addEventListener('slid.bs.carousel', function () {
      pasarPagina(i)
    })
    const carousel_inner = document.createElement("div");
    carousel_inner.className = "carousel-inner";

    //Creacion de boton 
    const pulsar = document.createElement("div");
    pulsar.className = "c-btn-pulsar"
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-light";
    btn.type = "button";
    btn.innerText = "Copiar"
    btn.addEventListener("click",function(){
      copiar(i);
    })
    pulsar.appendChild(btn);

    //creacion de fotos en caroyu
    for (let index = 1; index < 5; index++) {
      var item = document.createElement("div");
  
      if (index === 1) {
        item.className = "carousel-item active";
      }else{
        item.className = "carousel-item"
      }
      var foto = document.createElement("img");
      var ruta = "/modelos/Modelo" + i + "/Foto" + index + ".png";
      foto.src = ruta;
      foto.className = "d-block";
      foto.alt = "Foto" + index;
      foto.setAttribute("width","200px");
      foto.setAttribute("height","250px");
      item.appendChild(foto);
  
      carousel_inner.appendChild(item);
    }
  
    carousel.appendChild(carousel_inner);
  
    const buttonprev = document.createElement("button");
    buttonprev.className = "carousel-control-prev";
    buttonprev.type = "button";
    buttonprev.setAttribute("data-bs-target","#carouselExample_" + i);
    buttonprev.setAttribute("data-bs-slide","prev");
    const control_span =document.createElement("span");
    control_span.className = "carousel-control-prev-icon";
    control_span.setAttribute("aria-hidden","true");
    const control_span2 =document.createElement("span");
    control_span2.className = "visually-hidden";
    control_span2.innerText = "Previous"
  
    control_span.appendChild(control_span2);
    buttonprev.appendChild(control_span);
    carousel.appendChild(buttonprev);
  
    const buttonnext = document.createElement("button");
    buttonnext.className = "carousel-control-next";
    buttonnext.type = "button";
    buttonnext.setAttribute("data-bs-target","#carouselExample_"+ i);
    buttonnext.setAttribute("data-bs-slide","next"); 
    const control_span3 =document.createElement("span");
    control_span3.className = "carousel-control-next-icon";
    control_span3.setAttribute("aria-hidden","true");
    const control_span4 =document.createElement("span");
    control_span4.className = "visually-hidden";
    control_span4.innerText = "Next"; 
  
    control_span3.appendChild(control_span4);
    buttonnext.appendChild(control_span3);
    
    carousel.appendChild(buttonnext);
    carousel.appendChild(pulsar);
  
    modelos.appendChild(carousel);

    //guardar_localStorage(ttCarpeta,[1,1,1]);

  }

}

function obtener_LocalStorage(){

  if(localStorage.getItem("datos")){

     let galeria = JSON.parse(localStorage.getItem("datos"));

    console.log(galeria);
  }else{
    console.log('no hay entrada de local storage');
  }
  
}

function guardar_localStorage(cant,pos){
  let galeria = {
    Cant_Galerias : cant,
    posiciones : pos,  
  }

  localStorage.setItem("datos",JSON.stringify(galeria));
}


function copiar(element){
    console.log("la galeria seleccionada es : " + element)
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
        const alt = imagenActiva.alt;
        console.log('Galeria ' + galeria + ' y la imagen activa es: ', alt , ' su ruta es: ' + imagenActiva.src);
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


  /* levantar info de carpetas
  var cantCarpetas = 0;
  var rutas = [];
  var descripciones = []
 */

  /*
  await fetch('config/Cantidad_de_Modelos.txt')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => cantCarpetas = line);
  });
  

  for (var i = 1; i < ttCarpeta; i++) {
    rutas.push("/modelos/Modelo" + i + "/Descripcion.txt");
  }

  await Promise.all(
    rutas.map(async (element) => {
      const res = await fetch(element);
      const content = await res.text();
      let lines = content.split(/\n/);
      lines.forEach((line) => descripciones.push(line));
    })
  );
  */
  //crear json con informacion