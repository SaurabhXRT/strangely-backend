import { Request, Response } from "express";
import { CharacterService } from "../../services/CharacterService.js";
import logger from "../../logger/logger.js";
import { Character } from "../../models/Character/Character.js";

const characterservice = new CharacterService();
export const createCharacterController = async(req: any,res:any) => {
    try{
        const characterdata = {
            name: req.body.name,
            character_image: req.body.character_image,
            character_bio: req.body.character_bio,
            description: req.body.description,
        }
        const response = await characterservice.createCharacter(characterdata);
        if(response === "character created successfully"){
            return res.status(201).json({
                message: response
            })
        }else{
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    }catch(error){
        res.status(500).json({
            message: "interval server error",
        })
    }

}

export const getAllCharacters = async(req:any,res:any) => {
    try{
        const response = await Character.findAll();
        const responsedata = response.map((it) => it.toJSON());
        if(responsedata){
            return res.status(200).json({
                message: "all character fetched sucesfully",
                data: responsedata
            })
        }else{
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    }catch(error){
        logger.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}
