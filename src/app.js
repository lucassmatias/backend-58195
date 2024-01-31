import Express  from "express";
import productsRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

const app = Express();
app.use(Express.urlencoded({extended:true}));
app.use(Express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)

const server = app.listen(8080, () => {
    console.log("Servidor prendido");
})

