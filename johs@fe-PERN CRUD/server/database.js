const Pool = require("pg").Pool;
const pool= new Pool({
    user:"postgres",
    password:"j0hs@fe//01",
    port:5432,
    host:"localhost",
    database:"contacts",

});

module.exports = pool;