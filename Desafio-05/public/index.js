// eslint-disable-next-line no-undef
const socket = io();

//Variables DOM
const cards = document.getElementById("cards");

//Conexión al servidor
socket.on("saludos", (msg) => console.log(msg));

//Obtiene los productos del servidor
socket.on("productos", (prods) => {
  cards.innerHTML = "";
  prods.forEach((prod) => {
    cards.innerHTML += `
    <div class="card">
        <div class="cardHeader">
        <h3>${prod.title}</h3>
        </div>
        <div class="cardBody">
        <div class="cardimg">
            <img src="${prod.thumbnail[0]}" alt="Imagen del producto" />
        </div>
        <div class="cardDescription">
            <p>${prod.description}</p>
            <p class="cardSmall">Precio: $${prod.price}</p>
            <p class="cardSmall">Códgo: ${prod.code}</p>
            <p class="cardSmall">Stock: ${prod.stock}</p>
            <p class="cardSmall">Categoría: ${prod.category}</p>
        </div>
        </div>
        <div class="cardFooter">
        <button class="btn">Comprar</button>
        </div>
    </div>`;
  });
});
