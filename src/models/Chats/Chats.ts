import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";
import { IChat } from "../../Interfaces/IChat.js";
import { ICharacter } from '../../Interfaces/ICharacter.js';
class Chats extends Model<IChat> implements IChat {
    public id!: number;
    public user_id!: number;
    public character_id!: number;
    public user_message!: string;
    public character_response!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    character: ICharacter;
}

Chats.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    character_response: {
        type: DataTypes.TEXT,
        allowNull: false
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Chats',
    //tableName: 'users',
    timestamps: true,
  }
);

export { Chats };