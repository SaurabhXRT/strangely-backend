import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from "../../config/dbconfig.js";
import { IUser } from "../../Interfaces/IUser.js";
class User extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;
  public username!: string;
  public phone!: string;
  public email!: string;
  public isPhoneVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // phone: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    //   unique: true
    // },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // isPhoneVerified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'User',
    //tableName: 'users',
    timestamps: true,
  }
);

export { User };