import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createAnnouncement: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAnnouncements: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteAnnouncement: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=announcementController.d.ts.map