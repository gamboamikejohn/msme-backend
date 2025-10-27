"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadCount = exports.createNotification = exports.markAllAsRead = exports.markAsRead = exports.getNotifications = void 0;
const database_1 = __importDefault(require("../config/database"));
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const { unreadOnly } = req.query;
        const where = { userId };
        if (unreadOnly === 'true') {
            where.read = false;
        }
        const notifications = await database_1.default.notification.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to last 50 notifications
        });
        res.json({
            success: true,
            data: notifications
        });
    }
    catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications'
        });
    }
};
exports.getNotifications = getNotifications;
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const notification = await database_1.default.notification.findFirst({
            where: { id, userId }
        });
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }
        await database_1.default.notification.update({
            where: { id },
            data: { read: true }
        });
        res.json({
            success: true,
            message: 'Notification marked as read'
        });
    }
    catch (error) {
        console.error('Mark notification as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark notification as read'
        });
    }
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await database_1.default.notification.updateMany({
            where: { userId, read: false },
            data: { read: true }
        });
        res.json({
            success: true,
            message: 'All notifications marked as read'
        });
    }
    catch (error) {
        console.error('Mark all notifications as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark all notifications as read'
        });
    }
};
exports.markAllAsRead = markAllAsRead;
const createNotification = async (userId, title, message, type = 'info') => {
    try {
        const notification = await database_1.default.notification.create({
            data: {
                userId,
                title,
                message,
                type
            }
        });
        return notification;
    }
    catch (error) {
        console.error('Create notification error:', error);
        throw error;
    }
};
exports.createNotification = createNotification;
const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const count = await database_1.default.notification.count({
            where: { userId, read: false }
        });
        res.json({
            success: true,
            data: { count }
        });
    }
    catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get unread count'
        });
    }
};
exports.getUnreadCount = getUnreadCount;
//# sourceMappingURL=notificationController.js.map