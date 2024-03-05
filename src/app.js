import Express  from "express";
import productsRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from "socket.io";
import ProductManager from "./dao/db/product.manager.js";
import MessageManager from "./dao/db/message.manager.js";
import mongoose from "mongoose";

const app = Express();

//Configuracion para que la app lea operaciones complejas desde url
app.use(Express.urlencoded({extended:true}));
app.use(Express.json());

//Endpoints y routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/chat', chatRouter);

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
const mm = new MessageManager();
//Servidor tcp
const io = new Server(httpserver);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', `${socket.id}`);

    //Escucha el producto por socket
    socket.on('addProduct', async(data) => {
        let operation = await pm.addProduct(data);
        operation = await pm.getProducts();
        io.emit('refreshProducts', operation.message);
    });

    socket.on('message', async(data) => {
        let operation = await mm.addMessage(data.user, data.message);
        let result = await mm.getChat();
        io.emit('messageLogs', result.message);
    });

    socket.on('login', (data) => {
        socket.emit('messageLogs');
        socket.broadcast.emit('notification', data);
    });
});

mongoose.connect('mongodb+srv://zaskao:lucas2014@cluster0.upem3ly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
