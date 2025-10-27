"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireMentee = exports.requireMentor = exports.requireAdmin = exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await database_1.default.user.findUnique({
            where: { id: decoded.userId, status: 'ACTIVE' }
        });
        if (!user) {
            return res.status(403).json({ success: false, message: 'User not found or inactive' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient permissions'
            });
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.requireAdmin = (0, exports.requireRole)(['ADMIN']);
exports.requireMentor = (0, exports.requireRole)(['MENTOR', 'ADMIN']);
exports.requireMentee = (0, exports.requireRole)(['MENTEE', 'MENTOR', 'ADMIN']);
//# sourceMappingURL=auth.js.map