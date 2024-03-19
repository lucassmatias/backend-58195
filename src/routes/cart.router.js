import { Router } from "express";
import CartManager from "../dao/db/cart.manager.js";

const cartRouter = Router();
//Instancio CartManager y ProductManager ya que manipulo ambos tipos de datos
const cm = new CartManager();

/*Obtiene los productos según el carrito*/
cartRouter.get('/:cid', async(req, res) => {
    let id = req.params.cid;

    //Obtiene todos los productos del carro con POPULATE
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


    //ACTUALIZACION
    //Utilizo este endpoint (que anteriormente eliminaba el carrito) para eliminar solamente los productos

    let operation = await cm.deleteAllProductsfromCart(cartid);
    res.json({status: operation.status, message:operation.message});
})

cartRouter.delete('/:cid/products/:pid', async(req, res) => {

    //Elimina el producto del carrito
    let cartid = req.params.cid;
    let productid = req.params.pid;
    let operation = await cm.deleteProductFromCart(cartid, productid);
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

cartRouter.put('/:cid', async(req, res) => {

    //Recibe el arreglo desde el body y lo reemplaza en el carrito // Este punto no lo tengo bien entendido
    //Preferiria recibir el array de products y crear el producto desde el product manager ya que genera el id automatico

    let cartid = req.params.cid;
    let productArray = req.body;
    let operation = await cm.AddProductArrayToCart(cartid, productArray);
    res.json({status: operation.status, message:operation.message});
})

cartRouter.put('/:cid/products/:pid', async(req, res) => {

    //Ingresa la cantidad de productos a la cual desea cambiar

    let cartid = req.params.cid;
    let productid = req.params.pid;
    let newQuantity = req.body;
    let operation = await cm.ModifyQuantityofProduct(cartid, productid, newQuantity);
    res.json({status: operation.status, message:operation.message});
})

export default cartRouter;