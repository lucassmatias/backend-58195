//Cliente
const socket = io();
let codeInput = document.getElementById('code');
let nameInput = document.getElementById('name');
let priceInput = document.getElementById('price');
let stockInput = document.getElementById('stock');
let descriptionInput = document.getElementById('description');
let buttonInput = document.getElementById('input');
let productblock = document.getElementById('product-div');

//Envia el producto por socket
buttonInput.addEventListener('click', (e) => {

    //Evita que reinicie la pagina
    e.preventDefault();

    //Armado del producto
    let code = codeInput.value;
    let name = nameInput.value;
    let price = parseInt(priceInput.value);
    let stock = parseInt(stockInput.value);
    let description = descriptionInput.value;
    let product = {'title': name, 'description': description, 'price': price, 'thumbnail': 'Sin Imagen', 'code': code, 'stock': stock}

    //Envia el mensaje para crear el producto al servidor
    socket.emit('addProduct', product);
})
//Recibe la nueva lista del servidor para mostrarla en pantalla
socket.on('refreshProducts', (data) => {
    productblock.innerHTML = JSON.stringify(data);
    /*ACLARACIÓN → la recarga de los productos se va a ver en formato json debido a que no consigo seleccionar el #each del handlebars home*/ 
        /*data.map(item => {   
            `<li>ID: ${item.id}
                <ul>Codigo: ${item.code}</ul>
                <ul>Nombre: ${item.title}</ul>
                <ul>Descripción: ${item.description}</ul>
                <ul>Stock: ${item.stock}</ul>
            </li>`
        })}*/
})


