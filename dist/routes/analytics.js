"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const analyticsController_1 = require("../controllers/analyticsController");
const router = (0, express_1.Router)();
router.get('/dashboard', auth_1.authenticateToken, analyticsController_1.getDashboardAnalytics);
router.get('/sales/:userId', auth_1.authenticateToken, auth_1.requireMentor, analyticsController_1.getMenteeAnalytics);
router.post('/sales', auth_1.authenticateToken, auth_1.requireMentee, analyticsController_1.createSalesData);
exports.default = router;
//# sourceMappingURL=analytics.js.map