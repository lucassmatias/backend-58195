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
        if(Object.values(pProduct).includes(undefined)) {return("Error: Datos incompletos");}
        if(this.products.some(product => product.code === pProduct.code)) {return("Error: Código repetido");}
        if(this.products.length === 0) {pProduct.id = "1"}
        else {pProduct.id = (parseInt(this.products[this.products.length - 1].id) + 1).toString();}
        this.products.push(pProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        let list = await this.getProducts();
        this.products = list;
        return("Producto añadido");
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
        if(Object.values(newProduct).includes(undefined)){return("Error: Datos incompletos")}
        let product = this.products.find(product => product.id == pId);
        if(product !== undefined){
            let index = this.products.findIndex(product => product.id == pId);
            this.products[index] = {...product, ...newProduct};
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            let list = await this.getProducts();
            this.products = list;
            return("Producto actualizado");
        }
        else{return("Error: Producto no encontrado");}       
    }
    deleteProduct = async(pId) =>{
        let aux = [];
        this.products.forEach(x => {
            if(x.id != pId) aux.push(x);
        });
        await fs.promises.writeFile(this.path, JSON.stringify(aux));
        let list = await this.getProducts();
        this.products = list
        return("Producto eliminado");
    }
}

