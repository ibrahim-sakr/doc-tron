import {Model, DataTypes} from 'sequelize';
import {getConnection} from "../databaseConnection";

export default class Log extends Model {
    public id!: number;
    public job_id!: number;
    public status!: string;
    public output!: string;
    public error!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at!: Date | null;
}

Log.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    job_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING
    },
    output: {
        allowNull: true,
        type: DataTypes.TEXT({ length: 'medium' })
    },
    error: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    deleted_at: {
        allowNull: true,
        type: DataTypes.DATE
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'logs',
    sequelize: getConnection(), // this bit is important
});