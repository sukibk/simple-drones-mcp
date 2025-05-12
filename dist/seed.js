"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
const mockData_1 = require("./mockData");
(0, dotenv_1.config)(); // Load .env
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
});
async function seed() {
    await client.connect();
    console.log("🚀 Connected to PostgreSQL");
    // Clear existing data
    await client.query("DELETE FROM invoices");
    await client.query("DELETE FROM drones");
    await client.query("DELETE FROM organizations");
    // Insert organizations
    for (const org of mockData_1.mockOrganizations) {
        await client.query(`INSERT INTO organizations (id, name, type, contact_email, contact_phone, address, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [
            org.id,
            org.name,
            org.type,
            org.contact_email,
            org.contact_phone,
            org.address,
            org.created_at,
            org.updated_at,
        ]);
    }
    // Insert drones
    for (const drone of mockData_1.mockDrones) {
        await client.query(`INSERT INTO drones (id, model, manufacturer_id, price, specs, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`, [
            drone.id,
            drone.model,
            drone.manufacturer_id,
            drone.price,
            JSON.stringify(drone.specs),
            drone.created_at,
            drone.updated_at,
        ]);
    }
    // Insert invoices
    for (const invoice of mockData_1.mockInvoices) {
        await client.query(`INSERT INTO invoices (id, organization_id, amount, status, due_date, description, invoice_type, payment_terms, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [
            invoice.id,
            invoice.organization_id,
            invoice.amount,
            invoice.status,
            invoice.due_date,
            invoice.description,
            invoice.invoice_type,
            invoice.payment_terms,
            invoice.created_at,
            invoice.updated_at,
        ]);
    }
    await client.end();
    console.log("✅ Database seeded successfully.");
}
seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    client.end();
});
