import * as fs from "fs";

export default class ProductManager{
    constructor(){
        this.path = './products.txt';
        this.products = [];
        this.InitializeProducts();
    }
    InitializeProducts = async() =>{
        this.products = await this.getProducts();
    }
    addProduct = async(pProduct) =>{
        if(Object.values(pProduct).includes(undefined)) {console.log("Error: Datos incompletos"); return;}
        if(this.products.some(product => product.code === pProduct.code)) {console.log("Error: Código repetido"); return;}
        if(this.products.length === 0) {pProduct.id = "1"}
        else {pProduct.id = (parseInt(this.products[this.products.length - 1].id) + 1).toString();}
        this.products.push(pProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        let list = await this.getProducts();
        this.products = list;
        console.log("Producto añadido");
    }
    getProductsAsync = async() => {
        let result = await fs.promises.readFile(this.path, 'utf-8');
        if (result !== '') {
            return JSON.parse(result);
        } else {
            return [];
        }
    };
    
    getProducts = async() => {
        if(fs.existsSync(this.path)){
            let result = await this.getProductsAsync();
            return result;
        } 
        else{
            await fs.promises.writeFile(this.path, '');
            return [];
        }
    };
    
    getProductById = async(pId) => {
        let list = await this.getProducts()
        let product = await list.find(product => product.id == pId);
        if(product !== undefined) return product;
        else return("Error: Producto no encontrado");
    }
    updateProduct = async(pId, newProduct) => {
        let product = this.products.find(product => product.id == pId);
        if(product !== undefined){
            product = {...product, ...newProduct};
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            this.products = await this.getProducts();
            console.log("Producto actualizado");
        }
        else{console.log("Error: Producto no encontrado");}       
    }
    deleteProduct = async(pId) =>{
        let aux = [];
        this.products.forEach(x => {
            if(x.id != pId) aux.push(x);
        });
        await fs.promises.writeFile(this.path, JSON.stringify(aux));
        this.products = this.getProducts();
        console.log("Producto eliminado");
    }
}
class Product{
    constructor(pTitle, pDescription, pPrice, pThumbnail, pCode, pStock){
        this.title = pTitle;
        this.description = pDescription;
        this.price = pPrice;
        this.thumbnail = pThumbnail;
        this.code = pCode;
        this.stock = pStock;
    }
}



