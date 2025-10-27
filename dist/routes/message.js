"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const messageController_1 = require("../controllers/messageController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/messages/users:
 *   get:
 *     tags: [Messages]
 *     summary: Get chat users based on role
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat users retrieved successfully
 */
router.get('/users', auth_1.authenticateToken, messageController_1.getChatUsers);
/**
 * @swagger
 * /api/messages/direct/{userId}:
 *   get:
 *     tags: [Messages]
 *     summary: Get direct messages with a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Direct messages retrieved successfully
 */
router.get('/direct/:userId', auth_1.authenticateToken, messageController_1.getDirectMessages);
/**
 * @swagger
 * /api/messages/group/{groupId}:
 *   get:
 *     tags: [Messages]
 *     summary: Get group messages for a specific group
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group messages retrieved successfully
 */
router.get('/group/:groupId', auth_1.authenticateToken, messageController_1.getGroupMessages);
/**
 * @swagger
 * /api/messages/mark-read:
 *   post:
 *     tags: [Messages]
 *     summary: Mark messages as read
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Messages marked as read successfully
 */
router.post('/mark-read', auth_1.authenticateToken, messageController_1.markMessagesAsRead);
exports.default = router;
//# sourceMappingURL=message.js.map