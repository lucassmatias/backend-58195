import { Router } from "express";
import CartManager from "../dao/db/cart.manager.js";
import ProductManager from "../dao/db/product.manager.js";

const cartRouter = Router();
//Instancio CartManager y ProductManager ya que manipulo ambos tipos de datos
const cm = new CartManager();
const pm = new ProductManager();

/*Obtiene los productos según el carrito*/
cartRouter.get('/:id', async(req, res) => {
    let id = req.params.id;

    //Obtiene todos los productos del carro
    let operation = await cm.getProductbyCart(id);
    res.json({status: operation.status, message:operation.message});
})

cartRouter.get('/', async(req, res) => {
    //Obtiene todos los productos del carro
    let operation = await cm.getCarts();
    res.json({status: operation.status, message:operation.message});
})

/*Crea un nuevo carrito vacío*/
cartRouter.post('/', async(req, res) => {

    //Según lo que entendí esta vez, ya con entrar a este endpoint se crea el carrito con id autoincrementable
    let operation = await cm.addCart();
    res.json({status: operation.status, message:operation.message});
})

cartRouter.delete('/:cid', async(req, res) => {
    let cartid = req.params.cid;
    //Según lo que entendí esta vez, ya con entrar a este endpoint se crea el carrito con id autoincrementable
    let operation = await cm.deleteCart(cartid);
    res.json({status: operation.status, message:operation.message});
})

/*Añade un producto a un carrito*/
cartRouter.post('/:cid/product/:pid', async(req, res) => {
    let cartid = req.params.cid;
    let productid = req.params.pid;
    //Agrega el producto al carrito 
    let operation = await cm.addProducttoCart(cartid, productid);
    res.json({status: operation.status, message:operation.message});
})

export default cartRouter;