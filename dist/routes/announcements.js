"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const announcementController_1 = require("../controllers/announcementController");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, announcementController_1.createAnnouncement);
router.get('/', auth_1.authenticateToken, announcementController_1.getAnnouncements);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, announcementController_1.deleteAnnouncement);
exports.default = router;
//# sourceMappingURL=announcements.js.map