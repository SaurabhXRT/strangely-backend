import { Chats } from "../models/Chats/Chats.js";
import { User } from "../models/User/User";
import { Character } from "../models/Character/Character.js";
import logger from "../logger/logger.js";
import { MistralService } from "./AIService/MistralService.js";
import { ICharacter } from "../Interfaces/ICharacter.js";
import { IChat } from "../Interfaces/IChat.js";
import { EncryptDecryptService } from "./EncryptDecryptService.js";
import { Sequelize } from "sequelize";
const airesponseservice = new MistralService();
const encryptdecryptservice = new EncryptDecryptService();
const encrypt = (text: string) => encryptdecryptservice.encrypt(text);
const decrypt = (text: string) => encryptdecryptservice.decrypt(text);

interface ChatData {
  user_id: number;
  character_id: number;
  message: string;
}

export interface IChatData {
  character_id: number;
  name: string;
  character_image: string;
  last_message: string;
  last_message_time: Date;
}

export class ChatService {
  async createChat(data: ChatData): Promise<string> {
    try {
      const { user_id, character_id, message } = data;
      const characterabc: ICharacter | null = await Character.findByPk(
        character_id
      );
      const character = characterabc.toJSON();
      if (!character) {
        logger.error("Character not found");
        return "AI character not found";
      }

      const chatsHistory: IChat[] = await Chats.findAll({
        where: { user_id, character_id },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
      const chatHistory = chatsHistory.map((it: any) => it.toJSON());
    
      const messages = [
        {
          role: "system",
          content: `Your character name is ${character.name}. reply with only 2 or 3 sentence with proper grametically correct sentence and Your personality: ${character.description}`,
        },
      ];
      
      if (chatHistory.length > 0) {
        chatHistory.reverse().forEach((chat: IChat) => {
          messages.push({ role: "user", content: decrypt(chat.user_message) });
          messages.push({
            role: "assistant",
            content: decrypt(chat.character_response),
          });
        });
      }
      messages.push({ role: "user", content: message });

      const response = await airesponseservice.getMistralResponse(messages);

      await Chats.create({
        user_id,
        character_id,
        user_message: encrypt(message),
        character_response: encrypt(response),
      });
     

      return response;
    } catch (error) {
      logger.log(error);
      return "something went wrong";
    }
  }

  async getChatHistory(
    user_id: number,
    character_id: number
  ): Promise<IChat[]> {
    try {
      const chatsHistory: IChat[] = await Chats.findAll({
        where: { user_id, character_id },
        order: [["createdAt", "DESC"]],
      });
      const allchathistory = chatsHistory.map((it) => it.toJSON())
      const response = allchathistory.map((it) => ({
        ...it,
        user_message: decrypt(it.user_message),
        character_response: decrypt(it.character_response),
      }));

      return response;
    } catch (error) {
      logger.log(error);
      return [];
    }
  }

  async getUserAllChat(user_id: string): Promise<IChatData[]> {
    try {
      const chatData = await Chats.findAll({
        where: { user_id },
        attributes: ["character_id", "character_response", "createdAt"],
        include: [
          {
            model: Character,
            as: "character",
            attributes: ["name", "character_image"],
          },
        ],
        order: [["createdAt", "DESC"]],
        group: ["character_id"],
      });

      return chatData.map((chat) => ({
        character_id: chat.character_id,
        name: chat.character?.name || "Unknown",
        character_image: chat.character?.character_image || "",
        last_message: chat.character_response,
        last_message_time: chat.createdAt,
      }));
    } catch (error) {
      logger.log(error);
      return [];
    }
  }

  async deleteUserChat(character_id: string, user_id: string) {
    try {
      const chat = await Chats.destroy({
        where: { character_id, user_id },
      });
      if (chat > 0) {
        return true;
      }
    } catch (error) {
      logger.log(error);
      return false;
    }
  }
}
