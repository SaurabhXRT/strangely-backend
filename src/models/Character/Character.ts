import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";
import { ICharacter } from "../../Interfaces/ICharacter.js";
class Character extends Model<ICharacter> implements ICharacter {
    public id!: number;
    public name!: string;
    public character_image!: string;
    public description!: string;
    public character_bio!: string;
    public isPremiumCharacter!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    character_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    character_bio : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isPremiumCharacter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Character',
    //tableName: 'users',
    timestamps: true,
  }
);

export { Character };