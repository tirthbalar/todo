require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    logging: false,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.client = require("../model/clientService")(sequelize, DataTypes, Model);
db.user = require("../model/user")(sequelize, DataTypes, Model);

db.user.hasMany(db.client, { foreignKey: "userId", onDelete: "CASCADE" });
db.client.belongsTo(db.user);

db.sequelize.sync({ force: false });
module.exports = db;
