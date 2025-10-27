"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.changePassword = exports.updateProfile = exports.updateUserStatus = exports.getUsers = void 0;
const argon2_1 = __importDefault(require("argon2"));
const database_1 = __importDefault(require("../config/database"));
const getUsers = async (req, res) => {
    try {
        const { role, status } = req.query;
        const { user } = req;
        console.log(user);
        const where = {};
        if (role)
            where.role = role;
        if (status)
            where.status = status;
        // If user is not admin, restrict access based on role
        if (user.role !== 'ADMIN') {
            if (user.role === 'MENTOR') {
                // Mentors can only see mentees
                where.role = 'MENTEE';
            }
            else {
                // Mentees can't access this endpoint
                where.role = 'MENTOR';
            }
        }
        const users = await database_1.default.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                avatar: true,
                verified: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: users
        });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users'
        });
    }
};
exports.getUsers = getUsers;
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = await database_1.default.user.update({
            where: { id },
            data: { status },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                avatar: true,
                verified: true,
                createdAt: true,
                updatedAt: true
            }
        });
        res.json({
            success: true,
            data: user,
            message: `User ${status.toLowerCase()} successfully`
        });
    }
    catch (error) {
        console.error('Update user status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user status'
        });
    }
};
exports.updateUserStatus = updateUserStatus;
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, avatar } = req.body;
        // Check if user is updating their own profile or is admin
        if (req.user.id !== id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to update this profile'
            });
        }
        const user = await database_1.default.user.update({
            where: { id },
            data: { name, email, avatar },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                avatar: true,
                verified: true,
                createdAt: true,
                updatedAt: true
            }
        });
        res.json({
            success: true,
            data: user,
            message: 'Profile updated successfully'
        });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        // Check if user is updating their own password
        if (req.user.id !== id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to change this password'
            });
        }
        // Get user with password hash
        const user = await database_1.default.user.findUnique({
            where: { id }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Verify current password
        const validPassword = await argon2_1.default.verify(user.passwordHash, currentPassword);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        // Hash new password
        const newPasswordHash = await argon2_1.default.hash(newPassword);
        // Update password
        await database_1.default.user.update({
            where: { id },
            data: { passwordHash: newPasswordHash }
        });
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    }
    catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to change password'
        });
    }
};
exports.changePassword = changePassword;
const getUserStats = async (req, res) => {
    try {
        const totalUsers = await database_1.default.user.count();
        const mentors = await database_1.default.user.count({ where: { role: 'MENTOR' } });
        const mentees = await database_1.default.user.count({ where: { role: 'MENTEE' } });
        const activeUsers = await database_1.default.user.count({ where: { status: 'ACTIVE' } });
        const totalSessions = await database_1.default.session.count();
        const completedSessions = await database_1.default.session.count({ where: { status: 'COMPLETED' } });
        res.json({
            success: true,
            data: {
                totalUsers,
                mentors,
                mentees,
                activeUsers,
                totalSessions,
                completedSessions
            }
        });
    }
    catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user statistics'
        });
    }
};
exports.getUserStats = getUserStats;
//# sourceMappingURL=userController.js.map