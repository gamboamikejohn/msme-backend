"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.deleteResource = exports.getResourceById = exports.updateResource = exports.getResources = exports.createResource = void 0;
const database_1 = __importDefault(require("../config/database"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createResource = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const uploadedBy = req.user.id;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            });
        }
        const resource = await database_1.default.resource.create({
            data: {
                title,
                description,
                category,
                fileUrl: `/uploads/${req.file.filename}`,
                fileName: req.file.originalname,
                fileSize: req.file.size,
                uploadedBy
            },
            include: {
                uploader: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
        res.status(201).json({
            success: true,
            data: resource,
            message: 'Resource uploaded successfully'
        });
    }
    catch (error) {
        console.error('Create resource error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload resource'
        });
    }
};
exports.createResource = createResource;
const getResources = async (req, res) => {
    try {
        const { category } = req.query;
        const where = {};
        if (category)
            where.category = category;
        const resources = await database_1.default.resource.findMany({
            where,
            include: {
                uploader: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: resources
        });
    }
    catch (error) {
        console.error('Get resources error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resources'
        });
    }
};
exports.getResources = getResources;
const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category } = req.body;
        const resource = await database_1.default.resource.findUnique({
            where: { id }
        });
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }
        // Check if user is the uploader or admin
        if (resource.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to update this resource'
            });
        }
        let updateData = { title, description, category };
        // If new file is uploaded, update file info and delete old file
        if (req.file) {
            // Delete old file
            const oldFilePath = path_1.default.join(process.cwd(), 'uploads', path_1.default.basename(resource.fileUrl));
            if (fs_1.default.existsSync(oldFilePath)) {
                fs_1.default.unlinkSync(oldFilePath);
            }
            updateData = {
                ...updateData,
                fileUrl: `/uploads/${req.file.filename}`,
                fileName: req.file.originalname,
                fileSize: req.file.size
            };
        }
        const updatedResource = await database_1.default.resource.update({
            where: { id },
            data: updateData,
            include: {
                uploader: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
        res.json({
            success: true,
            data: updatedResource,
            message: 'Resource updated successfully'
        });
    }
    catch (error) {
        console.error('Update resource error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update resource'
        });
    }
};
exports.updateResource = updateResource;
const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await database_1.default.resource.findUnique({
            where: { id },
            include: {
                uploader: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }
        res.json({
            success: true,
            data: resource
        });
    }
    catch (error) {
        console.error('Get resource by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resource'
        });
    }
};
exports.getResourceById = getResourceById;
const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await database_1.default.resource.findUnique({
            where: { id }
        });
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }
        // Check if user is the uploader or admin
        if (resource.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this resource'
            });
        }
        // Delete file from filesystem
        const filePath = path_1.default.join(process.cwd(), 'uploads', path_1.default.basename(resource.fileUrl));
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        await database_1.default.resource.delete({
            where: { id }
        });
        res.json({
            success: true,
            message: 'Resource deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete resource error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete resource'
        });
    }
};
exports.deleteResource = deleteResource;
const getCategories = async (req, res) => {
    try {
        const categories = await database_1.default.resource.findMany({
            select: { category: true },
            distinct: ['category']
        });
        res.json({
            success: true,
            data: categories.map((c) => c.category)
        });
    }
    catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=resourceController.js.map