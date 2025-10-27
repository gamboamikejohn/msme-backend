"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const swagger_1 = require("./config/swagger");
const chatHandler_1 = require("./socket/chatHandler");
// Route imports
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const sessions_1 = __importDefault(require("./routes/sessions"));
const announcements_1 = __importDefault(require("./routes/announcements"));
const resources_1 = __importDefault(require("./routes/resources"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const ratings_1 = __importDefault(require("./routes/ratings"));
const message_1 = __importDefault(require("./routes/message"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
console.log((0, express_list_endpoints_1.default)(app));
// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-production-domain.com']
        : ['http://localhost:5173', 'http://localhost:3000', "https://fb82b6f9b443.ngrok-free.app", "https://03e3a8c36953.ngrok-free.app"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// Socket.IO setup
const io = new socket_io_1.Server(server, {
    cors: corsOptions
});
// Setup chat handlers
(0, chatHandler_1.setupChatHandlers)(io);
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploaded files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// API Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/sessions', sessions_1.default);
app.use('/api/announcements', announcements_1.default);
app.use('/api/resources', resources_1.default);
app.use('/api/analytics', analytics_1.default);
app.use('/api/ratings', ratings_1.default);
app.use('/api/messages', message_1.default);
app.use('/api/notifications', notifications_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Mentorship Management System API is running',
        timestamp: new Date().toISOString()
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
// Error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
exports.default = app;
//# sourceMappingURL=server.js.map