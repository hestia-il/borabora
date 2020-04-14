module.exports = {
    DEV_ENV: process.env.NODE_ENV || 'production',
    MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
    PORT: process.env.PORT || 30000,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_EXP: process.env.JWT_EXP,
    JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP,
    DB_TYPE: 'mysql',
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DBNAME: process.env.MYSQL_DBNAME,
};