import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME || 'Travelxplore', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'nilisha', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Disable logging for cleaner output
});

// Test database connection
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful ............................');
    } catch (error) {
        console.error('Unable to connect to the database ...............', error);
    }
}

// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

// Export the sequelize instance
export { sequelize };