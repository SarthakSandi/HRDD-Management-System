const sql = require("mssql");

const config = {
  user: "hrdd_user",
  password: "Hrdd@123",
  server: "127.0.0.1",          // local machine
  database: "HRDD_DB",
  port: 1433,                   // static TCP port
  options: {
    encrypt: false,             // local dev
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Create a single global connection pool
const poolPromise = sql.connect(config)
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};
