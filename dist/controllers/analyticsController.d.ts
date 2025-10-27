import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getDashboardAnalytics: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMenteeAnalytics: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createSalesData: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=analyticsController.d.ts.map