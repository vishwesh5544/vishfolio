import { ProjectService } from "@/services";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "@/controller";
import { getErrorMessage } from "@/utils"; // Importing the custom error handler

export class ProjectController implements IController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    // Handle both CRUD and batch operations
    public async handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        try {
            switch (req.method) {
                case "GET":
                    if (req.query.id) {
                        await this.getProjectById(req, res); // Fetch single project by ID
                    } else {
                        await this.getAllProjects(req, res); // Fetch all projects
                    }
                    break;
                case "POST":
                    if (Array.isArray(req.body)) {
                        await this.createBatch(req, res); // Batch create
                    } else {
                        await this.createProject(req, res); // Create single project
                    }
                    break;
                case "PUT":
                    if (Array.isArray(req.body)) {
                        await this.updateBatch(req, res); // Batch update
                    } else {
                        await this.updateProject(req, res); // Update single project
                    }
                    break;
                case "DELETE":
                    if (Array.isArray(req.body.ids)) {
                        await this.deleteBatch(req, res); // Batch delete
                    } else {
                        await this.deleteProject(req, res); // Delete single project
                    }
                    break;
                default:
                    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error); // Use the custom error handler
            res.status(500).json({ message: "Internal Server Error", error: errorMessage });
        }
    }

    // CRUD Operations
    private async getAllProjects(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const projects = await this.projectService.find();
        res.status(200).json(projects);
    }

    private async createProject(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const newProject = await this.projectService.create(req.body);
        res.status(201).json(newProject);
    }

    private async updateProject(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const updatedProject = await this.projectService.update(req.query.id as string, req.body);
        if (!updatedProject) {
            res.status(404).json({ message: "Project not found" });
        } else {
            res.status(200).json(updatedProject);
        }
    }

    private async deleteProject(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const deleted = await this.projectService.delete(req.query.id as string);
        if (!deleted) {
            res.status(404).json({ message: "Project not found" });
        } else {
            res.status(204).end();
        }
    }

    // Batch Operations
    private async createBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const newProjects = await this.projectService.createBatch(req.body);
        res.status(201).json(newProjects);
    }

    private async updateBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const updatedProjects = await this.projectService.updateBatch(req.body);
        res.status(200).json(updatedProjects);
    }

    private async deleteBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const deletedResults = await this.projectService.deleteBatch(req.body.ids);
        res.status(200).json(deletedResults);
    }

    private async getProjectById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const project = await this.projectService.findOne(req.query.id as string);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        } else {
            res.status(200).json(project);
        }
    }
}
