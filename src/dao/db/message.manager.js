import { messageModel } from "../models/message.model.js";

export default class MessageManager{
    constructor(){}

    getChat = async() => {
        try {
            let messages = await messageModel.find();
            return({status:'success', message: messages});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }

    addMessage = async(pUser, pMessage) => {
        try {
            let result = await messageModel.create({
                pUser,
                pMessage
            })
            return({status: 'success', message: 'Se agregó el mensaje'});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }
}