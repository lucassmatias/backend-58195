import { cartModel } from "../models/cart.model.js";

export default class CartManager{
    constructor(){}

    getCarts = async() => {
        try {
            let result = await cartModel.find();
            return({status:'success', message: result});
        } catch (ex) {
            return({status:'error', message: ex});
        }
    }

    getCartById = async(pId) => {
        try{
            let result = await cartModel.find({_id:pId});
            return({status:'success', message: result});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    getProductbyCart = async (pId) => {
        try{
            let result = await this.getCartById(pId);
            let products = result.products;
            return({status:'success', message: products});
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
            let cart = await cartModel.find({_id:pCartId});      
            if(cart.products.find(x => x.id == pProductId)){

                let selectedProductIndex = cart.products.findIndex(x => x.id == pProductId);
                cart.products[selectedProductIndex].quantity++;
            }
            else{
                cart.products = [...pCart.products, {id: pProductId, quantity: 1}];
            }
            let result = await cartModel.updateOne({_id: pCartId}, cart);
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