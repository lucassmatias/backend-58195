import Express  from "express";
import productsRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from "socket.io";

const app = Express();


app.use(Express.urlencoded({extended:true}));
app.use(Express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

app.engine('handlebars', Handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(Express.static(__dirname+'/public'));

const server = app.listen(8080, () => {
    console.log("Servidor prendido");
})

const socketServer = new Server(server);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");
    socket.on('addProduct', data => {
        console.log(data);
    })
})
