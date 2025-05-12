"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastmcp_1 = require("fastmcp");
const zod_1 = require("zod");
const db_1 = require("./lib/db");
const server = new fastmcp_1.FastMCP({
    name: "Drone MCP Server",
    version: "1.0.0",
});
server.addTool({
    name: "list_all_drones",
    description: "Fetch all drones from the database",
    parameters: zod_1.z.object({
        manufacturer: zod_1.z.string().optional(),
        limit: zod_1.z.number().optional().default(50),
    }),
    execute: async ({ manufacturer, limit }) => {
        let query = "SELECT * FROM drones";
        const values = [];
        if (manufacturer) {
            query += " WHERE manufacturer ILIKE $1";
            values.push(`%${manufacturer}%`);
        }
        query += ` LIMIT $${values.length + 1}`;
        values.push(limit);
        const res = await db_1.pool.query(query, values);
        return {
            type: "text",
            text: JSON.stringify(res.rows, null, 2),
        };
    },
});
server.start({ transportType: "stdio" });
