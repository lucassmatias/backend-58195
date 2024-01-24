import  ProductManager  from "./modules/ProductManager.js";
import Express  from "express";

const pm = new ProductManager();
let lista = await pm.getProducts();
console.log(lista);

const app = Express();
app.use(Express.urlencoded({extended:true}));

const server = app.listen(8080, () => {
    console.log("Servidor prendido");
})

app.get("/products/:id", async(req, res) => {
    let id = req.params.id;
    if(id !== undefined){
        lista = await pm.getProductById(id);
    }
    res.send(await lista);
})
app.get("/products/", async(req, res) => {
    let limit = req.query.limit;
    if(limit !== undefined){
        lista = await pm.getProducts();
        lista = lista.slice(0, parseInt(limit));
    }
    else{
        lista = await pm.getProducts();
    }
    res.send(await lista);
})
