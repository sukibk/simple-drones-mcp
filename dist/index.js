import { FastMCP } from "fastmcp";
import { z } from "zod";
import { Client } from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
// Fix for ESM __dirname and .env loading
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const PG_PASSWORD = process.env.PG_PASSWORD;
if (!PG_PASSWORD) {
    throw new Error("PostgreSQL password missing. Set PG_PASSWORD in your .env");
}
const pgClient = new Client({
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432"),
    user: process.env.PG_USER || "postgres",
    password: PG_PASSWORD,
    database: process.env.PG_DATABASE || "drone_db",
});
await pgClient.connect();
const server = new FastMCP({
    name: "Drone MCP Server",
    version: "1.0.0",
});
server.addTool({
    name: "list_all_drones",
    description: "Fetch all drones from the database",
    parameters: z.object({
        manufacturer: z.string().optional(),
        limit: z.number().optional().default(50),
    }),
    execute: async ({ manufacturer, limit }) => {
        const values = [];
        let query = "SELECT * FROM drones";
        if (manufacturer) {
            query += " WHERE manufacturer ILIKE $1";
            values.push(`%${manufacturer}%`);
        }
        query += ` LIMIT $${values.length + 1}`;
        values.push(limit);
        const res = await pgClient.query(query, values);
        return {
            type: "text",
            text: JSON.stringify(res.rows, null, 2),
        };
    },
});
server.start({ transportType: "stdio" });
