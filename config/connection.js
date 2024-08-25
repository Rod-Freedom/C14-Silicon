import Sequelize from 'sequelize';
import { configDotenv } from 'dotenv';

configDotenv();

const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = DB_URL
  ? new Sequelize(DB_URL)
  : new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
);

export default sequelize;