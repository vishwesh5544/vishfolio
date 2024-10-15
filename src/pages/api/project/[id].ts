import { ProjectService } from "@/services";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/utils"; // Custom error handler

const projectService = new ProjectService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    switch (req.method) {
        case "GET":
            try {
                const project = await projectService.findOne(id as string);
                if (!project) return res.status(404).json({ message: "Project not found" });
                return res.status(200).json(project);
            } catch (error) {
                return res.status(500).json({ message: "Internal Server Error", error: getErrorMessage(error) });
            }

        case "PUT":
            try {
                const updatedProject = await projectService.update(id as string, req.body);
                if (!updatedProject) return res.status(404).json({ message: "Project not found" });
                return res.status(200).json(updatedProject);
            } catch (error) {
                return res.status(500).json({ message: "Internal Server Error", error: getErrorMessage(error) });
            }

        case "DELETE":
            try {
                const deleted = await projectService.delete(id as string);
                if (!deleted) return res.status(404).json({ message: "Project not found" });
                return res.status(204).end();
            } catch (error) {
                return res.status(500).json({ message: "Internal Server Error", error: getErrorMessage(error) });
            }

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
