import { Router } from "express";
import ProductManager from "../dao/db/product.manager.js";

const productRouter = Router();
const pm = new ProductManager();

/*Muestra los productos o una cantidad de ellos*/ 
productRouter.get('/', async(req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let query = req.query.query;
    let sort = req.query.sort;
    //Obtengo todos los productos
    let operation = await pm.getProducts(limit, page, query, sort);
    res.json({status:operation.status, message:operation.message})
})

/*Devuelve el producto según id*/ 
productRouter.get('/:id', async(req, res) => {
    let id = req.params.id;
    let operation = await pm.getProductById(id);
    res.json({status:operation.status, message:operation.message})
})

/*Agrega un producto con el body del endpoint*/
productRouter.post('/', async(req, res) => {
    let product = req.body;
    let operation = await pm.addProduct(product);
    res.json({status: operation.status, message: operation.message})
})

/*Actualiza un producto con el body del endpoint*/ 
productRouter.put('/:id', async(req, res) => {
    let id = req.params.id;
    let product = req.body;
    let operation = await pm.updateProduct(id, product);
    res.json({status: operation.status, message: operation.message})
})

/*Elimina un producto según id*/
productRouter.delete('/:id', async(req, res) => {
    let id = req.params.id;
    let operation = await pm.deleteProduct(id);
    res.json({status: operation.status, message: operation.message})
})

export default productRouter;