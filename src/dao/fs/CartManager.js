import { json } from "express";
import * as fs from "fs";

export default class CartManager{
    constructor(){
        this.path = './carts.txt';
        this.carts = [];
        this.InitializeCarts();
    }
    InitializeCarts = async() =>{
        this.carts = (await this.getCarts()).message;
    }

    //Obtiene todos los carritos
    getCarts = async() => {
        if(fs.existsSync(this.path)){
            let carts = await this.getCartsAsync();
            return({status: 'success', message:carts});
        } 
        else{
            await fs.promises.writeFile(this.path, '');
            return({status: 'success', message:[]});
        }
    };
    getCartsAsync = async() => {
        let result = await fs.promises.readFile(this.path, 'utf-8');
        if (result !== '') {
            return JSON.parse(result);
        } else {
            return [];
        }
    };

    //Crea el carrito con id autoincrementable y array de productos vacio []
    addCart = async() =>{
        let newCart = {products: []}
        if(this.carts.length === 0) {newCart.id = "1"}
        else {newCart.id = (parseInt(this.carts[this.carts.length - 1].id) + 1).toString();}
        this.carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        let list = (await (this.getCarts())).message;
        this.carts = list;
        return({status: 'success', message:'Carrito añadido'});
    }

    //Obtiene el carrito por id
    getCartById = async(pId) => {
        let carts = (await this.getCarts()).message;
        let selectedCart = await carts.find(cart => cart.id == pId);
        if(selectedCart !== undefined) return ({status: 'success', message:selectedCart});
        else return({status: 'error', message:'Carrito no encontrado'});
    }

    //Obtiene los productos del carrito por id
    getProductbyCart = async(pId) => {

        //Primero obtiene el carrito
        let operation = (await this.getCartById(pId));
        if(operation.status != 'success'){

            //Si el carrito no fue encontrado
            return({status: 'error', message: operation.message});
        }
        else{

            //Luego se guardan los productos en una variable y se devuelven
            let products = operation.message.products;
            return({status: 'success', message:products});
        }  
    }

    //Agregar producto a carrito, recibe como parámetros al carrito y al producto
    addProducttoCart = async(pCart, pProduct) => {

        //Condicional si existe el producto ya en el carrito
        if(pCart.products.find(x => x.id == pProduct.id)){

            //Incrementa la cantidad
            let selectedProductIndex = pCart.products.findIndex(x => x.id == pProduct.id);
            pCart.products[selectedProductIndex].quantity++;
        }
        else{

            //Lo añade y le asigna cantidad en 1
            pCart.products = [...pCart.products, {id: pProduct.id, quantity: 1}];
        }

        //Actualiza el carrito en la lista auxiliar y lo persiste
        let cartIndex = this.carts.findIndex(x => x.id == pCart.id);
        this.carts[cartIndex].products = pCart.products;
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        let list = (await (this.getCarts())).message;
        this.carts = list;
        return({status: 'success', message:'Producto agregado'});
    }
}
