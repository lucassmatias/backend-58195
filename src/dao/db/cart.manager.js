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
            //POPULATE implementado acá
            let result = await cartModel.findOne({_id:pId}).populate('products.product');
            return({status:'success', message: result});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    getProductbyCart = async (pId) => {
        try{
            //POPULATE en el metodo GetCartById()
            let result = await this.getCartById(pId);
            let products = result.message.products;
            let eliminado = products.shift();
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
            let cart = await cartModel.findOne({_id : pCartId}); 
            if(cart.products.find(x => x.product == pProductId)){
                
                let selectedProductIndex = cart.products.findIndex(x => x.product == pProductId);
                cart.products[selectedProductIndex].quantity++;
            }
            else{
                cart.products.push({product: pProductId, quantity: 1});
            }
            let result = await cartModel.updateOne({_id: pCartId}, cart);
            cart = await cartModel.find({_id:pCartId}); 
            return({status:'success', message: cart});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    deleteCart = async(pId) => {
        try {
            let result = await cartModel.deleteOne({_id: pId});
            return({status:'success', message:'Carrito eliminado'});
        } catch (ex) {
            return({status:'error', message:'Carrito no eliminado'});
        }
    }

    deleteProductFromCart = async(pCartId, pProductId) => {
        try{
            let cart = await cartModel.findOne({_id: pCartId, products: {$elemMatch: {_id: pProductId}}});
            if(!cart) throw Error
            let aux = [];
            cart.products.forEach(product => {
                if(product._id != pProductId){
                    aux.push(product);
                }
            });
            cart.products = aux;
            let result = await cartModel.updateOne({_id: pCartId}, cart);
            return({status:'success', message: 'Producto eliminado'});
        }catch (ex) {
            return({status:'error', message:'Producto no eliminado'});
        }
    }

    AddProductArrayToCart = async(pCartId, pArray) => {
        try {
            let cart = await cartModel.findOne({_id: pCartId});
            if(!cart) throw Error
            cart.products = [];
            if(pArray == Array){
                pArray.forEach(product => {
                    cart.products.push(product);
                });
            }else{
                cart.products.push(product);
            }
            let result = await cartModel.updateOne({_id: pCartId}, cart);
            return({status:'success', message:'Producto actualizado'});
        } catch (ex) {
            return({status:'error', message:'Producto no actualizado'});
        }
    }

    ModifyQuantityofProduct = async(pCartId, pProductId, pNewQuantity) => {
        try {
            let cart = await cartModel.findOne({_id: pCartId});
            if(!cart) throw Error
            let selectedProductIndex = cart.products.findIndex(x => x.product == pProductId);
            if(!selectedProductIndex) throw Error
            cart.products[selectedProductIndex].quantity = pNewQuantity.quantity;
            let result = await cartModel.updateOne({_id: pCartId}, cart);
            return({status:'success', message:'Producto actualizado'});
        } catch (ex) {
            return({status:'error', message:'Producto no actualizado'});
        }
    }

    deleteAllProductsfromCart = async(pCartId) => {
        try {
            let cart = await cartModel.findOne({_id: pCartId});
            if(!cart) throw Error
            cart.products = [];
            let result = await cartModel.updateOne({_id: pCartId}, cart);
            return({status:'success', message:'Productos eliminados'});
        } catch (ex) {
            return({status:'error', message:'Productos no eliminados'});
        }
    }

}