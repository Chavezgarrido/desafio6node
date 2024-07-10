const { Pool } = require ('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 1528,
    database: "softjobs",
    allowExitOnIdle: true
});

module.exports = pool;