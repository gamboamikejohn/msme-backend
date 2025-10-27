"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markMessagesAsRead = exports.getGroupMessages = exports.getDirectMessages = exports.getChatUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const getChatUsers = async (req, res) => {
    try {
        const { user } = req;
        let chatUsers = [];
        if (user.role === 'ADMIN') {
            // Admin can chat with all active users
            chatUsers = await database_1.default.user.findMany({
                where: {
                    status: 'ACTIVE',
                    id: { not: user.id } // Exclude self
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true
                },
                orderBy: { name: 'asc' }
            });
            // Add General Chat group for admin
            const generalGroup = await database_1.default.chatGroup.findFirst({
                where: { isGeneral: true }
            });
            if (generalGroup) {
                chatUsers.unshift({
                    id: generalGroup.id,
                    name: generalGroup.name,
                    role: 'GROUP',
                    isGroup: true
                });
            }
        }
        else if (user.role === 'MENTOR') {
            // Mentor can chat with assigned mentees and admins
            const assignedMentees = await database_1.default.user.findMany({
                where: {
                    role: 'MENTEE',
                    status: 'ACTIVE',
                    menteeSessions: {
                        some: {
                            session: {
                                mentorId: user.id
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true
                }
            });
            const admins = await database_1.default.user.findMany({
                where: {
                    role: 'ADMIN',
                    status: 'ACTIVE'
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true
                }
            });
            chatUsers = [...assignedMentees, ...admins];
        }
        else {
            // Mentee can chat with assigned mentors and admins
            const assignedMentors = await database_1.default.user.findMany({
                where: {
                    role: 'MENTOR',
                    status: 'ACTIVE',
                    mentorSessions: {
                        some: {
                            mentees: {
                                some: {
                                    menteeId: user.id
                                }
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true
                }
            });
            const admins = await database_1.default.user.findMany({
                where: {
                    role: 'ADMIN',
                    status: 'ACTIVE'
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true
                }
            });
            // Add General Chat group for mentees
            const generalGroup = await database_1.default.chatGroup.findFirst({
                where: { isGeneral: true }
            });
            chatUsers = [...assignedMentors, ...admins];
            if (generalGroup) {
                chatUsers.unshift({
                    id: generalGroup.id,
                    name: generalGroup.name,
                    role: 'GROUP',
                    isGroup: true
                });
            }
        }
        res.json({
            success: true,
            data: chatUsers
        });
    }
    catch (error) {
        console.error('Get chat users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch chat users'
        });
    }
};
exports.getChatUsers = getChatUsers;
const getDirectMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.id;
        // Verify target user exists and is active
        const targetUser = await database_1.default.user.findFirst({
            where: {
                id: userId,
                status: 'ACTIVE'
            }
        });
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found or inactive'
            });
        }
        // Fetch direct messages between current user and target user
        const messages = await database_1.default.message.findMany({
            where: {
                OR: [
                    {
                        senderId: currentUserId,
                        receiverId: userId
                    },
                    {
                        senderId: userId,
                        receiverId: currentUserId
                    }
                ],
                groupId: null // Only direct messages
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        res.json({
            success: true,
            data: messages
        });
    }
    catch (error) {
        console.error('Get direct messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages'
        });
    }
};
exports.getDirectMessages = getDirectMessages;
const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;
        // Verify user is member of the group
        const membership = await database_1.default.groupMember.findFirst({
            where: {
                groupId,
                userId
            }
        });
        if (!membership) {
            return res.status(403).json({
                success: false,
                message: 'You are not a member of this group'
            });
        }
        // Fetch group messages
        const messages = await database_1.default.message.findMany({
            where: {
                groupId,
                receiverId: null // Only group messages
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        res.json({
            success: true,
            data: messages
        });
    }
    catch (error) {
        console.error('Get group messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch group messages'
        });
    }
};
exports.getGroupMessages = getGroupMessages;
const markMessagesAsRead = async (req, res) => {
    try {
        // const { messageIds } = req.body;
        // This is a placeholder for read status functionality
        // You can extend this when you add read status to your message schema
        res.json({
            success: true,
            message: 'Messages marked as read'
        });
    }
    catch (error) {
        console.error('Mark messages as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark messages as read'
        });
    }
};
exports.markMessagesAsRead = markMessagesAsRead;
//# sourceMappingURL=messageController.js.map