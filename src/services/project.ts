
import { Project } from '@/entities';
import { AppDataSource } from '@/config';
import { MongoRepository } from 'typeorm';
import { IService } from '@/services';

export class ProjectService implements IService<Project> {
  private repository: MongoRepository<Project>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Project);
  }

  // Create a new project
  async create(data: Partial<Project>): Promise<Project> {
    const newProject = this.repository.create(data);
    return this.repository.save(newProject);
  }

  // Find all projects
  async find(): Promise<Project[]> {
    return this.repository.find();
  }

  // Find a project by ID
  async findOne(id: string): Promise<Project | null> {
    return this.repository.findOneBy({ _id: id });
  }

  // Update a project by ID
  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ _id: id });
  }

  // Delete a project by ID
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  // Batch create projects
  async createBatch(data: Partial<Project>[]): Promise<Project[]> {
    const newProjects = this.repository.create(data);
    return this.repository.save(newProjects);
  }

  // Batch update projects
  async updateBatch(data: Array<{ id: string; update: Partial<Project> }>): Promise<Project[]> {
    const updatedProjects: Project[] = [];

    for (const { id, update } of data) {
      await this.repository.update(id, update);
      const updatedProject = await this.repository.findOneBy({ _id: id });
      if (updatedProject) {
        updatedProjects.push(updatedProject);
      }
    }

    return updatedProjects;
  }

  // Batch delete projects
  async deleteBatch(ids: string[]): Promise<boolean[]> {
    const results: boolean[] = [];

    for (const id of ids) {
      const result = await this.repository.delete(id);
      results.push(result.affected === 1);
    }

    return results;
  }
}
