import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Booking = sequelize.define('Booking', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentFile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departure: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    return: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    passengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export { Booking };