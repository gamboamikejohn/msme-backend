import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getUsers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateUserStatus: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const changePassword: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserStats: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=userController.d.ts.map