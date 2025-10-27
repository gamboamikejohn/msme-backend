import { Server } from 'socket.io';
interface SocketUser {
    id: string;
    name: string;
    role: string;
}
export declare const setupChatHandlers: (io: Server) => void;
declare module 'socket.io' {
    interface Socket {
        userId?: string;
        userData?: SocketUser;
    }
}
export {};
//# sourceMappingURL=chatHandler.d.ts.map