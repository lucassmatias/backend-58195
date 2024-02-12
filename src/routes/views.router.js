import { Router } from "express";
import ProductManager from "../modules/ProductManager.js";

const viewsRouter = Router();
let pm = new ProductManager();

viewsRouter.get('/', (req, res) => {
    res.render('index', {
        style: "index.css",
        title: 'index'});
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    let operation = await (pm.getProducts());
    let products = operation.message;
    res.render('realTimeProducts', {
        style: "index.css",
        products: products,
        title: 'Products'});
})

export default viewsRouter;