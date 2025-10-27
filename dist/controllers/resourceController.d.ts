import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createResource: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getResources: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateResource: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getResourceById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteResource: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCategories: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=resourceController.d.ts.map