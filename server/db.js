const { Pool } = require('pg');

const pool = new Pool({
    user: 'gbztfatf',
    host: 'surus.db.elephantsql.com',
    database: 'gbztfatf',
    password: 'AHuRmFe_libPCKqkN3bE6dWG_F4X3nuL',
    port: 5432,
    max: 100,
    idleTimeoutMillis: 30000,
});

module.exports = { pool };