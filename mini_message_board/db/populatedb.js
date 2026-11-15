#! /usr/bin/env node
process.loadEnvFile();

const { Client } = require("pg");

const SQL = `
create table if not exists messages(
id integer primary key generated always as identity,
message varchar(255),
username varchar(20),
created_at timestamptz default current_timestamp
);

insert into messages (message,username) values('Hello world!','wallace');
`;

async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.argv[2] || process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
