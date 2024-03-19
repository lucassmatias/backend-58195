import { Router } from "express";
import ProductManager from "../dao/db/product.manager.js";
import CartManager from "../dao/db/cart.manager.js";

const viewsRouter = Router();
const pm = new ProductManager();
const cm = new CartManager();

viewsRouter.get('/', (req, res) => {
    res.render('index', {
        style: "index.css",
        title: 'index'});
})


//VISTA DE PRODUCTOS
viewsRouter.get('/products', async (req, res) => {
    let page = req.query.page;
    let operation = await pm.getProducts(5, page, '', 'asc');
    let data = operation.message;
    let nextLink = data.hasNextPage ? `/products?page=${data.nextPage}` : null;
    let prevLink = data.hasPrevPage ? `/products?page=${data.prevPage}` : null;
    res.render('realTimeProducts', {
        style: "index.css",
        data: data,
        title: 'Products',
        prevPage: prevLink,
        nextPage: nextLink});
})

//VISTA DE CARRITO
viewsRouter.get('/carts/:cid', async(req, res) => {
    let cartid = req.params.cid;
    let operation = await cm.getProductbyCart(cartid);
    let products = operation.message;

    //No se renderizan los datos y no puedo solucionarlo, el handlebars de cart no reconoce las propiedades de product y quantity como parte del objeto en el #each. 
    //Dejé el res.json para que veas que el array se envía bien
    
    res.render('cart', {
        data: products,
        title: 'Cart'
    });
    //res.json(products);
})

export default viewsRouter;