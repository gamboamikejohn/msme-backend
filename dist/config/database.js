"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-var */
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new client_1.PrismaClient();
}
else {
    if (!global.__prisma) {
        global.__prisma = new client_1.PrismaClient();
    }
    prisma = global.__prisma;
}
exports.default = prisma;
//# sourceMappingURL=database.js.map