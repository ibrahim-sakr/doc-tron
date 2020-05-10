import {Model, DataTypes} from 'sequelize';
import {getConnection} from "../databaseConnection";

export default class Job extends Model {
    public id!: number;
    public in_progress!: boolean;
    public queued!: boolean;
    public name!: string;
    public description!: string | null;
    public scheduled!: string;
    public next_run!: Date;
    public args!: object;
    public worker!: object;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at!: Date | null;
}

Job.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
    },
    in_progress: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    queued: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    scheduled: {
        allowNull: false,
        type: DataTypes.STRING
    },
    next_run: {
        allowNull: false,
        type: DataTypes.DATE
    },
    args: {
        allowNull: false,
        type: DataTypes.JSON
    },
    worker: {
        allowNull: false,
        type: DataTypes.JSON
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
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'jobs',
    sequelize: getConnection(), // this bit is important
});