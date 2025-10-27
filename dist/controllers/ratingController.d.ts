import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createRating: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRatings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMentorRatings: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=ratingController.d.ts.map