"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.updateSession = exports.getSessions = exports.createSession = void 0;
const database_1 = __importDefault(require("../config/database"));
const createSession = async (req, res) => {
    try {
        const { title, description, date, duration, menteeIds } = req.body;
        const mentorId = req.user.id;
        const session = await database_1.default.session.create({
            data: {
                title,
                description,
                date: new Date(date),
                duration,
                mentorId,
                mentees: {
                    create: menteeIds.map(menteeId => ({ menteeId }))
                }
            },
            include: {
                mentor: { select: { id: true, name: true, email: true } },
                mentees: {
                    include: {
                        mentee: { select: { id: true, name: true, email: true } }
                    }
                }
            }
        });
        res.status(201).json({
            success: true,
            data: session,
            message: 'Session created successfully'
        });
    }
    catch (error) {
        console.error('Create session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create session'
        });
    }
};
exports.createSession = createSession;
const getSessions = async (req, res) => {
    try {
        const { user } = req;
        let sessions;
        if (user.role === 'ADMIN') {
            sessions = await database_1.default.session.findMany({
                include: {
                    mentor: { select: { id: true, name: true, email: true } },
                    mentees: {
                        include: {
                            mentee: { select: { id: true, name: true, email: true } }
                        }
                    }
                },
                orderBy: { date: 'asc' }
            });
        }
        else if (user.role === 'MENTOR') {
            sessions = await database_1.default.session.findMany({
                where: { mentorId: user.id },
                include: {
                    mentor: { select: { id: true, name: true, email: true } },
                    mentees: {
                        include: {
                            mentee: { select: { id: true, name: true, email: true } }
                        }
                    }
                },
                orderBy: { date: 'asc' }
            });
        }
        else {
            sessions = await database_1.default.session.findMany({
                where: {
                    mentees: {
                        some: { menteeId: user.id }
                    }
                },
                include: {
                    mentor: { select: { id: true, name: true, email: true } },
                    mentees: {
                        include: {
                            mentee: { select: { id: true, name: true, email: true } }
                        }
                    }
                },
                orderBy: { date: 'asc' }
            });
        }
        res.json({
            success: true,
            data: sessions
        });
    }
    catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sessions'
        });
    }
};
exports.getSessions = getSessions;
const updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, duration, status } = req.body;
        const { user } = req;
        // Check if user has permission to update this session
        if (user.role === 'MENTOR') {
            const session = await database_1.default.session.findUnique({
                where: { id }
            });
            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: 'Session not found'
                });
            }
            if (session.mentorId !== user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only update your own sessions'
                });
            }
        }
        const session = await database_1.default.session.update({
            where: { id },
            data: {
                title,
                description,
                date: date ? new Date(date) : undefined,
                duration,
                status
            },
            include: {
                mentor: { select: { id: true, name: true, email: true } },
                mentees: {
                    include: {
                        mentee: { select: { id: true, name: true, email: true } }
                    }
                }
            }
        });
        res.json({
            success: true,
            data: session,
            message: 'Session updated successfully'
        });
    }
    catch (error) {
        console.error('Update session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update session'
        });
    }
};
exports.updateSession = updateSession;
const deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        // Check if user has permission to delete this session
        if (user.role === 'MENTOR') {
            const session = await database_1.default.session.findUnique({
                where: { id }
            });
            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: 'Session not found'
                });
            }
            if (session.mentorId !== user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only delete your own sessions'
                });
            }
        }
        await database_1.default.session.delete({
            where: { id }
        });
        res.json({
            success: true,
            message: 'Session deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete session'
        });
    }
};
exports.deleteSession = deleteSession;
//# sourceMappingURL=sessionController.js.map