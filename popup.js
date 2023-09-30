//contar carpetas
window.onload = CargarHtml;
// Función para hacer la solicitud AJAX al archivo PHP


//bucle para levantar txt de cada carpeta
//async function contarCarpetas(){
  async function CargarHtml(){

  const modelos = document.getElementById("modelos");
 
  var cantCarpetas = 0;
  //var rutas = [];
  //var descripciones = []

  await fetch('/Cantidad_de_Modelos.txt')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => cantCarpetas = line);
  });

  var tt = parseInt(cantCarpetas) + 1

/*
  for (var i = 1; i < tt; i++) {
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

  //Crear carrouseles

  for (let i = 1; i < tt; i++) {

    const carousel = document.createElement("div");
    carousel.id = "carouselExample_" + i;
    carousel.className = "carousel slide carousel-fade";
    const carousel_inner = document.createElement("div");
    carousel_inner.className = "carousel-inner";

    const form_check = document.createElement("div");
    form_check.className = "form-check"
    const input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "radio";
    input.name = "flexRadioDefault";
    input.id="flexRadioDefault_" + i;

    form_check.appendChild(input);
   
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
      foto.alt = "Foto-Modelo-" + index;
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
    carousel.appendChild(form_check);
  
    modelos.appendChild(carousel);
    
    
  }




 /* CARROUSEL
    <div id="carouselExample_1" class="carousel slide carousel-fade">
      <div class="carousel-inner">
      <div class="carousel-item active">
          <img src="/modelos/Modelo1/Foto1.png" class="d-block" alt="img-model-coti" width="200px" height="250px">
      </div>
      <div class="carousel-item">
          <img src="/modelos/Modelo1/Coti_2.png" class="d-block" alt="img-model-coti" width="200px" height="250px">
      </div>
      <div class="carousel-item">
          <img src="/modelos/Modelo1/Coti_3.png" class="d-block" alt="img-model-coti" width="200px" height="250px">
      </div>
      <div class="carousel-item">
          <img src="/modelos/Modelo1/Coti_3.png" class="d-block" alt="img-model-coti" width="200px" height="250px">
      </div>
  </div>
  BOTONES
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample_1" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample_1" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
  </button>
</div>


  for (let index = 0; index < tt-1; index++) {
    //construir html - carrouseles

  }

*/

}

