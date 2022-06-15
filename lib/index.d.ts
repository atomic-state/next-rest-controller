import { NextApiRequest, NextApiResponse } from "next/types";
declare type ControllerMethods = {
    [k: string]: (req: NextApiRequest, res: NextApiResponse) => void;
};
export declare function Controller(paths?: ControllerMethods): (req: NextApiRequest, res: NextApiResponse) => void;
export {};
