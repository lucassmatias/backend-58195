import Express  from "express";
import productsRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from "socket.io";
import ProductManager from "./modules/ProductManager.js";

const app = Express();

//Configuracion para que la app lea operaciones complejas desde url
app.use(Express.urlencoded({extended:true}));
app.use(Express.json());

//Endpoints y routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

//Configuracion handlebars
app.engine('handlebars', Handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');
app.use(Express.static(__dirname+'/public'));

//Servidor http
const httpserver = app.listen(8080, () => {
    console.log("Servidor prendido");
})

const pm = new ProductManager();
//Servidor tcp
const io = new Server(httpserver);
io.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    //Escucha el producto por socket
    socket.on('addProduct', async(data) => {
        let operation = await pm.addProduct(data);
        console.log([operation.status, operation.message]);
        operation = await pm.getProducts();
        io.emit('refreshProducts', operation.message);
    })
})
