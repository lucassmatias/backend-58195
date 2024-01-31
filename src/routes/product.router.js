import { Router } from "express";
import ProductManager from "../modules/ProductManager.js";

const productRouter = Router();
const pm = new ProductManager();

productRouter.get('/', async(req, res) => {
    let limit = req.query.limit;
    let products;
    if(limit !== undefined){
        products = await pm.getProducts();
        products = products.slice(0, parseInt(limit));
    }
    else{
        products = await pm.getProducts();
    }
    res.send(products);
})

productRouter.get('/:id', async(req, res) => {
    let id = req.params.id;
    let product = await pm.getProductById(id);
    if(product === String){
        res.status(400).send({status: 'error', message:{product}})
    }
    res.send(product);
})

productRouter.post('/', async(req, res) => {
    let product = req.body;
    let status = await pm.addProduct(product);
    res.send(status);
})

productRouter.put('/:id', async(req, res) => {
    let id = req.params.id;
    let product = req.body;
    let status = await pm.updateProduct(id, product);
    res.send(status);
})

productRouter.delete('/:id', async(req, res) => {
    let id = req.params.id;
    let status = await pm.deleteProduct(id);
    res.send(status);
})

export default productRouter;