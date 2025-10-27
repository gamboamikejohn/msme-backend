import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createSession: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSessions: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateSession: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSession: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=sessionController.d.ts.map