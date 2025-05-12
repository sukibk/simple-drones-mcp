"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockInvoices = exports.mockDrones = exports.mockOrganizations = void 0;
exports.mockOrganizations = Array.from({ length: 20 }, (_, i) => {
    const orgTypes = ["manufacturer", "client", "both"];
    const orgNames = [
        "DJI",
        "Skydio",
        "Autel Robotics",
        "Parrot",
        "Yuneec",
        "PowerVision",
        "Kespry",
        "Insitu",
        "AeroVironment",
        "Draganfly",
        "EHang",
        "Flyability",
        "Freefly Systems",
        "Impossible Aerospace",
        "Intel",
        "Microdrones",
        "Percepto",
        "senseFly",
        "Skycatch",
        "Wingtra",
    ];
    return {
        id: `org-${i + 1}`,
        name: orgNames[i],
        type: orgTypes[i % 3],
        contact_email: `contact@${orgNames[i]
            .toLowerCase()
            .replace(/\s+/g, "")}.com`,
        contact_phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9000) + 1000} Tech Blvd, Silicon Valley, CA`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
});
exports.mockDrones = (() => {
    const droneModels = [
        {
            manufacturer: "DJI",
            models: [
                "Mavic 3 Pro",
                "Mavic Air 2S",
                "Mini 3 Pro",
                "Phantom 4 Pro V2.0",
                "Inspire 3",
                "Matrice 350 RTK",
                "Avata",
                "FPV Combo",
            ],
        },
        {
            manufacturer: "Skydio",
            models: ["Skydio 2+", "Skydio X10", "Skydio X2D", "Skydio 3"],
        },
        {
            manufacturer: "Autel Robotics",
            models: ["EVO II Pro", "EVO Nano+", "EVO Lite+", "EVO Max 4T"],
        },
        {
            manufacturer: "Parrot",
            models: ["ANAFI Ai", "ANAFI USA", "ANAFI Thermal"],
        },
        {
            manufacturer: "Yuneec",
            models: ["H520E", "Typhoon H3", "Mantis G"],
        },
        {
            manufacturer: "PowerVision",
            models: ["PowerEgg X", "PowerDolphin", "PowerRay"],
        },
        {
            manufacturer: "Kespry",
            models: ["Kespry 2S", "Kespry Enterprise"],
        },
        {
            manufacturer: "Insitu",
            models: ["ScanEagle", "Integrator", "RQ-21A Blackjack"],
        },
        {
            manufacturer: "AeroVironment",
            models: ["Quantix Recon", "VAPOR 55", "Puma LE", "Raven"],
        },
        {
            manufacturer: "Draganfly",
            models: ["Commander 3 XL", "Heavy Lift", "X4-P"],
        },
    ];
    const drones = [];
    let droneId = 1;
    for (let i = 0; i < 50; i++) {
        const manufacturerIndex = i % 10;
        const modelSet = droneModels[manufacturerIndex];
        const modelIndex = i % modelSet.models.length;
        const model = modelSet.models[modelIndex];
        const variant = ["", " Plus", " Enterprise", " Advanced", " Pro"][Math.floor(Math.random() * 5)];
        const price = Math.floor(Math.random() * 9000) + 1000;
        drones.push({
            id: `drone-${droneId++}`,
            model: `${model}${variant}`,
            manufacturer_id: `org-${manufacturerIndex + 1}`,
            price: price,
            specs: {
                weight: `${Math.floor(Math.random() * 2000) + 500}g`,
                flight_time: `${Math.floor(Math.random() * 30) + 10} minutes`,
                range: `${Math.floor(Math.random() * 5) + 1} km`,
                camera: ["4K/60fps", "5.1K/30fps", "8K/24fps", "1080p/120fps"][Math.floor(Math.random() * 4)],
                max_speed: `${Math.floor(Math.random() * 30) + 20} m/s`,
                obstacle_avoidance: Math.random() > 0.3 ? "Yes" : "No",
                transmission_range: `${Math.floor(Math.random() * 10) + 5} km`,
                battery_capacity: `${Math.floor(Math.random() * 5000) + 2000} mAh`,
                gps: Math.random() > 0.2 ? "GPS + GLONASS" : "GPS",
                gimbal_axis: Math.random() > 0.5 ? "3-axis" : "2-axis",
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
    }
    return drones;
})();
exports.mockInvoices = (() => {
    const statuses = ["paid", "unpaid", "overdue"];
    const invoiceTypes = [
        "Product Purchase",
        "Maintenance Service",
        "Software License",
        "Training Services",
        "Consulting Services",
        "Repair Services",
        "Custom Development",
        "Extended Warranty",
    ];
    const randomDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365));
        return date.toISOString().split("T")[0];
    };
    const invoices = [];
    let invoiceId = 1;
    for (let i = 0; i < 50; i++) {
        const orgId = `org-${Math.floor(Math.random() * 20) + 1}`;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const invoiceType = invoiceTypes[Math.floor(Math.random() * invoiceTypes.length)];
        let amount;
        switch (invoiceType) {
            case "Product Purchase":
                amount = Math.floor(Math.random() * 50000) + 5000;
                break;
            case "Maintenance Service":
                amount = Math.floor(Math.random() * 5000) + 1000;
                break;
            case "Software License":
                amount = Math.floor(Math.random() * 10000) + 2000;
                break;
            case "Training Services":
                amount = Math.floor(Math.random() * 8000) + 3000;
                break;
            case "Consulting Services":
                amount = Math.floor(Math.random() * 15000) + 5000;
                break;
            case "Repair Services":
                amount = Math.floor(Math.random() * 7000) + 1500;
                break;
            case "Custom Development":
                amount = Math.floor(Math.random() * 30000) + 10000;
                break;
            case "Extended Warranty":
                amount = Math.floor(Math.random() * 4000) + 1000;
                break;
            default:
                amount = Math.floor(Math.random() * 10000) + 1000;
        }
        invoices.push({
            id: `invoice-${invoiceId++}`,
            organization_id: orgId,
            amount,
            status,
            due_date: randomDate(),
            description: `${invoiceType} #${i + 1}`,
            invoice_type: invoiceType,
            payment_terms: ["Net 30", "Net 60", "Net 90"][Math.floor(Math.random() * 3)],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
    }
    return invoices;
})();
