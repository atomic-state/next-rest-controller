import { NextApiRequest, NextApiResponse } from "next/types";
declare type ControllerMethods = {
    [k: string]: (req: NextApiRequest, res: NextApiResponse) => void;
};
export declare function Controller(path: string, paths?: ControllerMethods): (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export {};
