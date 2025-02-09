#! /usr/bin/env node

const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    lastname VARCHAR (255 ),
    mail VARCHAR ( 255 ),
    password VARCHAR ( 255 ),
    date TIMESTAMP,
    status VARCHAR ( 255 ),
    salt VARCHAR ( 8 ));
    
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    text VARCHAR,
    author INTEGER,
    time TIMESTAMP);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DBSTRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();