import { messageModel } from "../models/message.model.js";

export default class MessageManager{
    constructor(){}
    getChat = async() => {
        let messages = await messageModel.find();
        return({status:'success', message: messages[0]});
    }

    addMessage = async(pUser, pMessage) => {
        try {
            let user = pUser;
            let message = pMessage;
            let result = await messageModel.create({
                user,
                message
            })
            return({status: 'success', message: 'Se agregó el mensaje'});
        } catch (ex) {
            return({status:'error', message: ex.message});
        }
    }
}

