import { ProjectController } from '@/controller';
import { NextApiRequest, NextApiResponse } from 'next';

const projectController = new ProjectController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return projectController.handle(req, res);
}
