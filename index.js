const grid = document.getElementById("product-grid"); // contenedor de los productos

async function fetchDestacados() {
      try {
        // Hacemos la solicitud HTTP: PEDIMOS A LA API, QUE NOS DE LOS POSTS (QUE USAREMOS COMO muebles)
        const respuesta = await fetch("/data/muebles.json");
        if (!respuesta.ok) throw new Error("No se pudo cargar muebles.json");
        
        const muebles = await respuesta.json(); // Extraemos el JSON de la respuesta
        const destacados = muebles.slice(0,3); //elijo los primeros 3 muebles como destacados

      
        // Creamos una tarjeta por cada mueble
        // foreach recorre cada elemento del array
        destacados.forEach(mueble => {
          const card = document.createElement("div"); // Creamos un div
          card.className = "product-card"; // Le asignamos clase CSS para estilo

          //imagen para cada mueble
          const imagen = document.createElement("img"); // Creamos un elemento de imagen
          imagen.src = mueble.imagen;
          imagen.alt = mueble.nombre;

          const titulo = document.createElement("h3"); // Creamos un título para. la tarjeta
          titulo.textContent = mueble.nombre; // Llenamos el contenido con el título que nos llega de cada elemento de "courses"

          const btnDetail = document.createElement("a"); // botón para ver detalle
          btnDetail.textContent = "Ver Detalle"; 
          btnDetail.className = "button";
          // le ponemos el texto que queremos que muestre el botón
          btnDetail.setAttribute('href',`/./detalleProducto/producto.html?id=${mueble.id}`)

          // Evento onclick al hacer clic: mostramos detalle (esta es otra forma de hacer el addEventListener, ambas están bien)
         // btnDetail.onclick = () => showDetail(mueble);
          // Alternativa: btnDetail.addEventListener("click", () => showDetail(course));

          // Armamos la tarjetita (le agregamos al div el titulo y el botón de ver detalle)
          card.appendChild(imagen);
          card.appendChild(titulo);
          card.appendChild(btnDetail);

          // Agregamos la tarjeta al contenedor de tarjetas
          grid.appendChild(card);
        });

      } catch (error) {
        // Manejo de errores: si algo sale mal en el pedido. Vamos a hacer esto:
        console.error("Error al cargar productos:", error); //mostrar error por consola
        // Mostramos mensaje al usuario
        error = createElement("p")
        error.textContent = "No se pudieron cargar los productos"
      }
    }

    fetchDestacados();