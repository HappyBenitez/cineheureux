var peliculas = [];
//Se añade una pelicula de ejmplo
var pelicula = {
  nombre: "SPIDERMAN",
  imagen:
    "https://musicart.xboxlive.com/7/200c4600-0000-0000-0000-000000000002/504/image.jpg",
  trailer: "https://www.youtube.com/embed/r6t0czGbuGI?si=ZRiU5CTg1GuaF1Gh"
};
peliculas.push(pelicula);
listarPeliculas();
//--------------------------
//Se crea la funciçon para agregar pelicula
function agregarPelicula() {
  //Se obtiene el valor de las cajas de texto
  var nombrePelicula = document.getElementById("nombrePelicula").value;
  var urlImagen = document.getElementById("urlImagen").value;
  //Para evitar error en trailer, se debe convertir el enlace en formato EMBED
  var urlTrailer = convertirURLaEmbed(
    document.getElementById("urlTrailer").value
  );
  // Validar que el nombre no esté vacío y no se repita
  if (
    nombrePelicula.trim() === "" ||
    peliculas.some((pelicula) => pelicula.nombre === nombrePelicula)
  ) {
    alert(
      "Ingresa un nombre de película válido que no esté vacío o que no esté repetido."
    );
    return;
  } else if (urlImagen.trim() === "") {
    // Validar que la URL de la imagen no esté vacía
    alert("Ingresa una URL de imagen válida que no esté vacía.");
    return;
  } else if (
    !/^(http|https):\/\/[a-z0-9\.-]+\.[a-z]{2,4}(\/.*)?\.(jpg|jpeg|png|gif|bmp)$/i.test(
      urlImagen
    )
  ) {
    // Validar que la URL sea una imagen
    alert(
      "La URL ingresada no es una imagen válida (debe ser .jpg, .jpeg, .png, .gif o .bmp)."
    );
    return;
  } else if (urlTrailer.trim() === "") {
    //Valida que la url del trailer no este vacio
    alert("Ingresa la URL del tráiler de la película.");
    return;
  } else {
    // Si pasa todas las validaciones, añadir la película
    var pelicula = {
      nombre: nombrePelicula,
      imagen: urlImagen,
      trailer: urlTrailer
    };
    peliculas.push(pelicula);
    //La lista con la funcion listar pelicula
    listarPeliculas();
    //Se limpia las cajas de texto
    document.getElementById("nombrePelicula").value = "";
    document.getElementById("urlImagen").value = "";
    document.getElementById("urlTrailer").value = "";
  }
}
//Se crea la función de eliminar pelicula
function eliminarPelicula(pelicula) {
  var nombrePelicula = pelicula.nombre;
  peliculas = peliculas.filter(function (p) {
    return p.nombre !== nombrePelicula;
  });
  listarPeliculas();
}
//Se crea la función de listar pelicula
function listarPeliculas() {
  var lista = document.getElementById("listaPeliculas");
  lista.innerHTML = ""; // Limpia la lista de películas

  peliculas.forEach(function (pelicula) {
    var peli = document.createElement("div");
    peli.className = "pelicula";

    var Trailer = document.createElement("a");
    Trailer.href = pelicula.trailer;
    Trailer.target = "_blank";

    var imagen = document.createElement("img");
    imagen.src = pelicula.imagen;
    imagen.alt = pelicula.nombre;

    var nombrePeli = document.createElement("p");
    nombrePeli.textContent = pelicula.nombre;

    var eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.className = "eliminar-button";
    eliminarButton.addEventListener("click", function () {
      eliminarPelicula(pelicula);
    });

    Trailer.appendChild(imagen);
    peli.appendChild(Trailer);
    peli.appendChild(nombrePeli);
    peli.appendChild(eliminarButton);

    lista.appendChild(peli);
  });
}
//Se crea la función de convertir la url de trailer a embeb
function convertirURLaEmbed(url) {
  // Verifica si la URL contiene "/embed/" y si es una URL de YouTube
  if (url.includes("/embed/") && url.includes("youtube.com")) {
    return url; // La URL ya está en formato embed
  }

  // Extrae el ID del video de la URL de YouTube
  var videoID = obtenerVideoID(url);

  // Verifica si se pudo obtener un ID válido
  if (videoID) {
    // Construye la URL de embed
    var embedURL = "https://www.youtube.com/embed/" + videoID;
    return embedURL;
  } else {
    // Devuelve la URL original si no se pudo obtener un ID válido
    return url;
  }
}
//Se crea la función de obtener ID del trailer de la pelicula
function obtenerVideoID(url) {
  // Intenta extraer el ID del video de la URL
  var match = /[?&]v=([^&]+)/.exec(url);
  return match && match[1];
}
