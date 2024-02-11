import * as fs from "fs";

export default class ProductManager{
    constructor(){
        this.path = './products.txt';
        this.products = [];
        this.InitializeProducts();
    }
    InitializeProducts = async() =>{
        this.products = (await this.getProducts()).message;
    }

    //Agregar producto
    addProduct = async(pProduct) =>{

        //En esta linea valido que esten presentes los campos obligatorios
        if(Object.values(pProduct).includes(undefined)) {return({status:'error', message: 'Datos incompletos'});}

        //Valido que no exista el codigo 
        if(this.products.some(product => product.code === pProduct.code)) {return({status:'error', message: 'Código repetido'});}

        //Si es el primer producto le asigno id 1
        if(this.products.length === 0) {pProduct.id = "1"}

        //En esta linea convierto el campo id en autoincremental
        else {pProduct.id = (parseInt(this.products[this.products.length - 1].id) + 1).toString();}

        //Campo status en verdadero por default
        pProduct.status = true;

        //Agrego el nuevo producto a la lista auxiliar
        this.products = [...this.products, pProduct]

        //Persisto la nueva lista
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

        //Refresco la lista auxiliar
        let list = (await (this.getProducts())).message;
        this.products = list;
        return({status: 'success', message:'Producto añadido'});
    }
        
    //Obtiene todos los productos
    getProducts = async() => {
        if(fs.existsSync(this.path)){
            let result = await this.getProductsAsync();
            return ({status: 'success', message: result});
        } 
        else{
            await fs.promises.writeFile(this.path, '');
            return ({status: 'success', message: []});
        }
    };
    getProductsAsync = async() => {
        let result = await fs.promises.readFile(this.path, 'utf-8');
        if (result !== '') {
            return JSON.parse(result);
        } else {
            return [];
        }
    };

    //Obtiene los productos por id
    getProductById = async(pId) => {
        //Busco el producto en la lista auxiliar
        let product = this.products.find(product => product.id == pId);
        if(product !== undefined) return ({status:'success', message:product});
        else return({status: 'error', message:'Producto no encontrado'});
    }

    //Actualiza producto por id
    updateProduct = async(pId, newProduct) => {

        //Valido que los campos esten completo y permite que no estén obligatoriamente todos los campos de producto
        if(Object.values(newProduct).includes(undefined)){return({status: 'error', message:'Datos incompletos'})}

        //Verifica que exista el producto
        let product = this.products.find(product => product.id == pId);
        if(product !== undefined){

            //Encuentra el producto en la lista auxiliar y lo actualiza con los nuevos valores
            let index = this.products.findIndex(product => product.id == pId);
            this.products[index] = {...product, ...newProduct};

            //Persiste
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            let list = (await this.getProducts()).message;
            this.products = list;
            return({status:'success', message:'Producto actualizado'});
        }
        else{return({status: 'error', message:'Producto no encontrado'});}       
    }

    //Eliminar producto por id
    deleteProduct = async(pId) =>{

        //Lista auxiliar donde irá la lista sin el producto seleccionado
        let aux = [];

        //Se verifica que exista el producto
        let exists = this.products.includes(x => x.id == pId);
        if(!exists){

            //Llena la lista auxiliar con los productos que no van a ser eliminados
            this.products.forEach(x => {
                if(x.id != pId) aux.push(x);
            });

            //Persiste
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
            let list = (await this.getProducts()).message;
            this.products = list
            return({status:'success', message:'Producto eliminado'});
        }
        else{
            return({status: 'error', message:'Producto no encontrado'});
        }
    }
}

