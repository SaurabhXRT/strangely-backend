import logger from "../../logger/logger.js";
import { ChatService } from "../../services/ChatService.js";
const chatservice = new ChatService();
export const createChatController = async(req:any,res:any) => {
    console.log(req.user)
    try{
        const data = {
            user_id: req.user.user_id,

            character_id: req.params.character_id,
            message: req.body.message
        }
        const response = await chatservice.createChat(data);
        return res.status(201).json({
            message: "Chat created successfully",
            data: response
        });

    }catch(error){
        logger.log(error);
        return res.status(500).josn({
            message: 'Internal Server Error'
        })
    }
}

export const getChatHistoryController = async(req:any,res:any) => {
    try{
        const data = {
            user_id: req.user.user_id,
            character_id: req.params.character_id
        }
        console.log(data);

        const response = await chatservice.getChatHistory(data.user_id,data.character_id);
        return res.status(200).json({
            message: "chat history gfetched",
            data: response
        })

    }catch(error){
        logger.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

export const getUserAllChatController = async(req:any,res:any) => {
    try{
        const user_id = req.user.user_id;
        const response = await chatservice.getUserAllChat(user_id);
        return res.status(200).json({
            message: "all chat fetched",
            data: response
        })

    }catch(error){
        logger.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }

}

export const DeleteUserChatController = async(req: any, res: any) => {
    try{
        const user_id = req.user.user_id;
        const character_id = req.params.character_id;
        const response = await chatservice.deleteUserChat(user_id,character_id);
        if(response){
            return res.status(200).json({
                message: "chat deleted",
            });
        }
    }catch(error){
        logger.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}
