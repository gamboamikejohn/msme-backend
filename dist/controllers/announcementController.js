"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.getAnnouncements = exports.createAnnouncement = void 0;
const database_1 = __importDefault(require("../config/database"));
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, targetRole } = req.body;
        const createdBy = req.user.id;
        const announcement = await database_1.default.announcement.create({
            data: {
                title,
                message,
                targetRole,
                createdBy
            },
            include: {
                author: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
        res.status(201).json({
            success: true,
            data: announcement,
            message: 'Announcement created successfully'
        });
    }
    catch (error) {
        console.error('Create announcement error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create announcement'
        });
    }
};
exports.createAnnouncement = createAnnouncement;
const getAnnouncements = async (req, res) => {
    try {
        const { user } = req;
        let announcements;
        if (user.role === 'ADMIN') {
            // Admin can see all announcements
            announcements = await database_1.default.announcement.findMany({
                include: {
                    author: {
                        select: { id: true, name: true, email: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
        }
        else {
            // Users can see announcements for their role or general ones
            announcements = await database_1.default.announcement.findMany({
                where: {
                    OR: [
                        { targetRole: user.role },
                        { targetRole: 'MENTEE' } // Assuming general announcements are targeted to MENTEE
                    ]
                },
                include: {
                    author: {
                        select: { id: true, name: true, email: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
        }
        res.json({
            success: true,
            data: announcements
        });
    }
    catch (error) {
        console.error('Get announcements error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch announcements'
        });
    }
};
exports.getAnnouncements = getAnnouncements;
const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await database_1.default.announcement.delete({
            where: { id }
        });
        res.json({
            success: true,
            message: 'Announcement deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete announcement error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete announcement'
        });
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
//# sourceMappingURL=announcementController.js.map