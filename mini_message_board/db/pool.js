const { Pool } = require("pg");

// module.exports = new Pool({
//   host: "localhost";
// user:'bahun',
// database:'mini_message_board',
// password:'bahun69',
// port:5432
// });

module.exports = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
