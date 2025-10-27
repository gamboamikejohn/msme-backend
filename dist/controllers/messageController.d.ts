import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getChatUsers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDirectMessages: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGroupMessages: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markMessagesAsRead: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=messageController.d.ts.map