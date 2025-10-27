"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/sessions:
 *   post:
 *     tags: [Sessions]
 *     summary: Create a new training session
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: integer
 *               menteeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Session created successfully
 */
router.post('/', auth_1.authenticateToken, auth_1.requireMentor, sessionController_1.createSession);
/**
 * @swagger
 * /api/sessions:
 *   get:
 *     tags: [Sessions]
 *     summary: Get training sessions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sessions retrieved successfully
 */
router.get('/', auth_1.authenticateToken, sessionController_1.getSessions);
/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     tags: [Sessions]
 *     summary: Update a training session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session updated successfully
 */
router.put('/:id', auth_1.authenticateToken, auth_1.requireMentor, sessionController_1.updateSession);
/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     tags: [Sessions]
 *     summary: Delete a training session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted successfully
 */
router.delete('/:id', auth_1.authenticateToken, auth_1.requireMentor, sessionController_1.deleteSession);
exports.default = router;
//# sourceMappingURL=sessions.js.map