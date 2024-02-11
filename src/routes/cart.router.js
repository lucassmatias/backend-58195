import { Router } from "express";
import CartManager from "../modules/CartManager.js";
import ProductManager from "../modules/ProductManager.js";

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

/*Crea un nuevo carrito vacío*/
cartRouter.post('/', async(req, res) => {

    //Según lo que entendí esta vez, ya con entrar a este endpoint se crea el carrito con id autoincrementable
    let operation = await cm.addCart();
    res.json({status: operation.status, message:operation.message});
})

/*Añade un producto a un carrito*/
cartRouter.post('/:cid/product/:pid', async(req, res) => {
    let cartid = req.params.cid;

    //Primero consulta por el carrito
    let getCart = await cm.getCartById(cartid);
    if(getCart.status != 'success'){
        return({status: 'error', message: 'Carrito no encontrado'});
    }
    let productid = req.params.pid;

    //Luego consulta el producto
    let getProduct = await pm.getProductById(productid);
    if(getProduct.status != 'success'){
        return({status: 'error', message: 'Producto no encontrado'});
    }
    
    //Agrega el producto al carrito 
    let operation = await cm.addProducttoCart(getCart.message, getProduct.message);
    res.json({status: operation.status, message:operation.message});
})

export default cartRouter;