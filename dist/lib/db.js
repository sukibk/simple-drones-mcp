// src/lib/db.ts
import { Pool } from "pg";
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "drone_db",
    password: "TenisMS1!",
    port: 5432,
});
