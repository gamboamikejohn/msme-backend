"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ratingController_1 = require("../controllers/ratingController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/ratings:
 *   post:
 *     tags: [Ratings]
 *     summary: Create a rating for a mentor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                 type: string
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rating created successfully
 */
router.post('/', auth_1.authenticateToken, ratingController_1.createRating);
/**
 * @swagger
 * /api/ratings:
 *   get:
 *     tags: [Ratings]
 *     summary: Get ratings (filtered by user role)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ratings retrieved successfully
 */
router.get('/', auth_1.authenticateToken, ratingController_1.getRatings);
/**
 * @swagger
 * /api/ratings/mentor/{mentorId}:
 *   get:
 *     tags: [Ratings]
 *     summary: Get ratings for a specific mentor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mentorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mentor ratings retrieved successfully
 */
router.get('/mentor/:mentorId', auth_1.authenticateToken, ratingController_1.getMentorRatings);
exports.default = router;
//# sourceMappingURL=ratings.js.map