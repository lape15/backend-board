const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "goodgirl",
    database: "job-board",
    logging: false,
    define: {},
  },
  test: {
    dialect: "postgres",
    name: "hifast_test",
    database: "hifast_test",
    storage: "./db.sqlite",
    synchronize: false,
    // autoLoadModels: true,
    // logging: true,
    dialectOptions: {
      filename: "./db.sqlite",
    },
  },

  production: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseFloat(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    define: {
      underscored: true,
    },
    ssl: true,
    // synchronize: true, //
    autoLoadModels: true,
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seeder",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
};
