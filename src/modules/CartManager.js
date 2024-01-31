import { json } from "express";
import * as fs from "fs";

export default class CartManager{
    constructor(){
        this.path = './carts.txt';
        this.carts = [];
        this.InitializeCarts();
    }
    InitializeCarts = async() =>{
        this.carts = await this.getCarts();
    }
    getCarts = async() => {
        if(fs.existsSync(this.path)){
            let result = await this.getCartsAsync();
            return result;
        } 
        else{
            await fs.promises.writeFile(this.path, '');
            return [];
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
    addCart = async(pCart) =>{
        if(this.carts.length === 0) {pCart.id = "1"}
        else {pCart.id = (parseInt(this.carts[this.carts.length - 1].id) + 1).toString();}
        this.carts.push(pCart);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        let list = await this.getCarts();
        this.carts = list;
        return("Carrito añadido");
    }
    getCartById = async(pId) => {
        let carts = await this.getCarts()
        let cart = await carts.find(cart => cart.id == pId);
        if(cart !== undefined) return cart;
        else return("Error: Carrito no encontrado");
    }
    getProductbyCart = async(pId) => {
        let cart = await this.getCartById(pId);
        let products = cart.products;
        return products;
    }
    addProducttoCart = async(pId, pProduct) => {
        let cart = this.carts.find(cart => cart.id == pId);
        cart.products.push(pProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        let list = await this.getCarts();
        this.carts = list;
        return("Producto añadido");
    }
}
