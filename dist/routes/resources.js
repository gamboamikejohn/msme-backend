"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const resourceController_1 = require("../controllers/resourceController");
const router = (0, express_1.Router)();
// Configure multer for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') } // 5MB
});
/**
 * @swagger
 * /api/resources:
 *   post:
 *     tags: [Resources]
 *     summary: Upload a new resource
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Resource uploaded successfully
 */
router.post('/', auth_1.authenticateToken, auth_1.requireMentor, upload.single('file'), resourceController_1.createResource);
/**
 * @swagger
 * /api/resources:
 *   get:
 *     tags: [Resources]
 *     summary: Get all resources
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 */
router.get('/', auth_1.authenticateToken, resourceController_1.getResources);
/**
 * @swagger
 * /api/resources/categories:
 *   get:
 *     tags: [Resources]
 *     summary: Get all resource categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */
router.get('/categories', auth_1.authenticateToken, resourceController_1.getCategories);
/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     tags: [Resources]
 *     summary: Get resource by ID
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
 *         description: Resource retrieved successfully
 */
router.get('/:id', auth_1.authenticateToken, resourceController_1.getResourceById);
/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     tags: [Resources]
 *     summary: Update a resource
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Resource updated successfully
 */
router.put('/:id', auth_1.authenticateToken, upload.single('file'), resourceController_1.updateResource);
/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     tags: [Resources]
 *     summary: Delete a resource
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
 *         description: Resource deleted successfully
 */
router.delete('/:id', auth_1.authenticateToken, resourceController_1.deleteResource);
exports.default = router;
//# sourceMappingURL=resources.js.map