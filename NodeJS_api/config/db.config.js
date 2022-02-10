module.exports = {
    HOST: 'localhost',
    USER: 'LauraM',
    PASSWORD: 'Chubaca2021',
    DB: "nodejs_bbdd",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};