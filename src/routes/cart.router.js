import { Router } from "express";
import CartManager from "../modules/CartManager.js";

const cartRouter = Router();
const cm = new CartManager();

cartRouter.get('/:id', async(req, res) => {
    let id = req.params.id;
    let products = await cm.getProductbyCart(id);
    if(products === String){
        res.status(400).send({status: 'error', message:{product}})
    }
    res.send(products);
})

cartRouter.post('/', async(req, res) => {
    let cart = req.body;
    let status = await cm.addCart(cart);
    res.send(status);
})

cartRouter.post('/:id', async(req, res) => {
    let id = req.params.id;
    let cart = req.body;
    let status = await cm.addProducttoCart(id, cart);
    res.send(status);
})


export default cartRouter;