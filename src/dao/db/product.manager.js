import { productModel } from "../models/product.model.js";

export default class ProductManager{
    constructor(){}

    addProduct = async(pProduct) => {
        try {
            if(!pProduct.code||!pProduct.title||!pProduct.description||!pProduct.price||!pProduct.thumbnail||!pProduct.stock){
                throw new Error();
            }
            let code = pProduct.code;
            let title = pProduct.title;
            let description = pProduct.description;
            let price = pProduct.price;
            let thumbnail = pProduct.thumbnail;
            let stock = pProduct.stock;
            let status = true;
            let result = await productModel.create({
                code,
                status,
                title,
                description,
                price,
                stock,
                thumbnail
            });
            return({status:'success', message: 'Se agregó el producto'});
        } catch (ex) {
            return({status:'error', message: 'No se agregó el producto'});
        }
    }

    getProducts = async() => {
        try {
            let products = await productModel.find();
            return({status:'success', message: products});
        } catch (ex) {
            return({status:'error', message: 'Productos no encontrados'})
        }
    }

    getProductById = async(pId) => {
        try {
            let products = await productModel.find({_id: pId});
            return({status:'success', message: products});
        } catch (ex) {
            return({status:'error', message: 'Productos no encontrados'})
        }
    }

    updateProduct = async(pId, pProduct) => {
        try {
            let result = await productModel.updateOne({_id: pId}, pProduct);
            return({status:'success', message: 'Producto actualizado'});
        } catch (ex) {
            return({status:'error', message: 'Producto no actualizado'});
        }
    }

    deleteProduct = async(pId) => {
        try {
            let result = await productModel.deleteOne({_id: pId});
            return({status:'success', message:'Producto eliminado'});
        } catch (ex) {
            return({status:'error', message:'Producto no eliminado'});
        }
    }
}