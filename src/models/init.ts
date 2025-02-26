import { Database, DbOptions } from "../database/database.js";
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { User } from "./User/User.js";
import { Character } from "./Character/Character.js";
import { Chats } from "./Chats/Chats.js";
export async function initDatabase(db: Database, dbOptions: DbOptions) {
  await db.initInstance(dbOptions);
  await User.sync();
  logger.log("user model initiated successfully");
  await Character.sync();
  logger.log("character model initiated");

  await Chats.sync();
  logger.log("Chats model initiated successfully");
  Character.hasMany(Chats, {
    foreignKey: "character_id",
    as: "chats",
  });
  User.hasMany(Chats, {
    foreignKey: "user_id",
    as: "chats",
  });
  Chats.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });
  Chats.belongsTo(Character, {
    foreignKey: "character_id",
    as: "character",
  });
}
