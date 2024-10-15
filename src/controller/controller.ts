import { NextApiRequest, NextApiResponse } from 'next';

export interface IController {
  handle(req: NextApiRequest, res: NextApiResponse): Promise<void>;
}
