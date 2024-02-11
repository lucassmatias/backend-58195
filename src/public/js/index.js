const socket = io();
let codeInput = document.getElementById('code');
let nameInput = document.getElementById('name');
let priceInput = document.getElementById('price');
let stockInput = document.getElementById('stock');
let descriptionInput = document.getElementById('description');
let buttonInput = document.getElementById('input');

buttonInput.addEventListener('click', (e) => {
    e.preventDefault();
    let code = codeInput.value;
    let name = nameInput.value;
    let price = parseInt(priceInput.value);
    let stock = parseInt(stockInput.value);
    let description = descriptionInput.value;
    let product = [name, description, price, 'Sin Imagen', code, stock]
    socket.emit('addProduct', product);
})


