import express  from "express";
import { createCharacterController , getAllCharacters } from "../controllers/Character/Character.js";
import { createChatController, getChatHistoryController,getUserAllChatController,DeleteUserChatController } from "../controllers/Chats/ChatController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { AuthController, checkUsernameAvailability } from "../controllers/User/AuthController.js";
const router = express.Router();

router.post("/createcharacter", createCharacterController);
router.get("/getallfreecharacter", getAllCharacters);
router.post("/createchat/:character_id", authMiddleware, createChatController);
router.get("/getchathistory/:character_id", authMiddleware, getChatHistoryController);
router.get("/getuserallchat", authMiddleware, getUserAllChatController);
router.post("/createuser", AuthController);
router.post("/deleteuserchat", AuthController, DeleteUserChatController);
router.get("/validateusername", checkUsernameAvailability)

export default router;