/*
After initializing Sequelize, we don’t need to write CRUD functions, Sequelize supports all of them:

    create a new User: create(object)
    find a User by id: findByPk(id)
    find a User by email: findOne({ where: { email: ... } })
    get all Users: findAll()
    find all Users by username: findAll({ where: { username: ... } })

These functions will be used in our Controllers and Middlewares.
*/
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

/*
The association between Users and Roles is Many-to-Many relationship:
– One User can have several Roles.
– One Role can be taken on by many Users.

We use User.belongsToMany(Role) to indicate that the user model can belong to many Roles and vice versa.

With through, foreignKey, otherKey, we’re gonna have a new table user_roles as connection between users and roles table via their primary key as foreign keys.
*/