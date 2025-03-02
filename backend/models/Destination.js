import { sequelize } from '../database/db.js';
import { DataTypes } from 'sequelize';
import slugify from 'slugify';

const Destination = sequelize.define('Destination', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    basePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    mainImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    destinationDetailImages: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {}
    },
    urlSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    detailedDescription: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: []
    },
    flightInformation: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        validate: {
            hasRequiredFields(value) {
                const requiredFields = ['price', 'booking', 'baggageAllowance', 'totalFlights', 'airlines'];
                const missingFields = requiredFields.filter(field => !value[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Missing required flight information fields: ${missingFields.join(', ')}`);
                }
            }
        }
    },
    attractions: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    }
}, {
    timestamps: true,
    hooks: {
        beforeValidate: (destination) => {
            if (destination.name && (!destination.urlSlug || destination.changed('name'))) {
                destination.urlSlug = slugify(destination.name, {
                    lower: true,
                    strict: true
                });
            }
        }
    }
});

export default Destination;