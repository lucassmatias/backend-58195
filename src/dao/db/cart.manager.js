import { cartModel } from "../models/cart.model.js";

export default class CartManager{
    constructor(){}

    getCarts = async() => {
        try {
            let result = await cartModel.find();
            return({status:'success', message: result});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    getCartById = async(pId) => {
        try{
            let result = await cartModel.find({_id:pId});
            return({status:'success', message: result[0]});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    getProductbyCart = async (pId) => {
        try{
            let result = await this.getCartById(pId);
            return({status:'success', message: result.products});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }
    
    addCart = async() => {
        try {
            let products = {};
            let result = await cartModel.create({
                products
            });
            return({status: 'success', message: 'Se agregó el carrito'})
        } catch (ex) {
            return({status:'error', message:'No se agregó el carrito'});
        }
    }

    addProducttoCart = async(pCartId, pProductId) => {
        try {
            let cart = await cartModel.find({_id : pCartId}); 
            if(cart[0].products.find(x => x.product == pProductId)){
                
                let selectedProductIndex = cart[0].products.findIndex(x => x.product == pProductId);
                cart[0].products[selectedProductIndex].quantity++;
            }
            else{
                cart[0].products.push({product: pProductId, quantity: 1});
            }
            let result = await cartModel.updateOne({_id: pCartId}, cart[0]);
            cart = await cartModel.find({_id:pCartId}); 
            return({status:'error', message: cart});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    deleteCart = async(pId) => {
        try {
            let result = await cartModel.deleteOne({_id: pId});
            return({status:'success', message:'Producto eliminado'});
        } catch (ex) {
            return({status:'error', message:'Producto no eliminado'});
        }
    }

}