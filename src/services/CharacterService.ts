import logger from "../logger/logger.js";
import { Character } from "../models/Character/Character.js";

export class CharacterService {
    async createCharacter(data: any){
        try{
            const response = await Character.create({
                ...data
            });
            if(response){
                return "character created successfully";
            }

        }catch(error){
            logger.log(error);
            return error.message;
        }
    }
}