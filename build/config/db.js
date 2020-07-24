"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE_NAME,
    },
});
exports.default = db;
