import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import { compare, hash } from 'bcrypt';

class User extends Model {
    checkPassword(inputPass) {
        return compare(inputPass, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                try {
                    user.password = await hash(user.password, 10);
                    return user
            
                } catch (err) {
                    throw new Error(err.message)
                }
            },
            // There's no feature to update users right now, but for later maybe...
            beforeUpdate: async (user) => {
                try {
                    if (user.changed('password')) user.password = await hash(user.password, 10)
                    return user
        
                } catch (err) {
                    throw new Error(err.message)
                }
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

export default User;