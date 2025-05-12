"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// src/lib/db.ts
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "drone_db",
    password: "TenisMS1!",
    port: 5432,
});
