import { Router } from "express";
import ProductManager from "../modules/ProductManager.js";

const viewsRouter = Router();
let cm = new ProductManager();
let lista = await cm.getProducts();
let products = lista;

viewsRouter.get('/', (req, res) => {
    res.render('index', {
        style: "index.js"
    });
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {products});
})

export default viewsRouter;