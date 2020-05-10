import {Model, DataTypes} from 'sequelize';
import {getConnection} from "../databaseConnection";

export default class User extends Model {

}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'users',
    sequelize: getConnection(), // this bit is important
});