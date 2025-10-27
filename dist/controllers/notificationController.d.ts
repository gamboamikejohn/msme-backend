import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getNotifications: (req: AuthRequest, res: Response) => Promise<void>;
export declare const markAsRead: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAllAsRead: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createNotification: (userId: string, title: string, message: string, type?: string) => Promise<{
    message: string;
    id: string;
    userId: string;
    title: string;
    type: string;
    read: boolean;
    createdAt: Date;
}>;
export declare const getUnreadCount: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=notificationController.d.ts.map