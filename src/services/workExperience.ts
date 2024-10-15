import { WorkExperience } from '@/entities';
import { AppDataSource } from '@/config';
import { MongoRepository } from 'typeorm';
import { IService } from '@/services';

export class WorkExperienceService implements IService<WorkExperience> {
  private repository: MongoRepository<WorkExperience>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(WorkExperience);
  }

  async create(data: Partial<WorkExperience>): Promise<WorkExperience> {
    const newExperience = this.repository.create(data);
    return this.repository.save(newExperience);
  }

  async find(): Promise<WorkExperience[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<WorkExperience | null> {
    return this.repository.findOneBy({ _id: id });
  }

  async update(id: string, data: Partial<WorkExperience>): Promise<WorkExperience | null> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ _id: id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async createBatch(data: Partial<WorkExperience>[]): Promise<WorkExperience[]> {
    const newExperiences = this.repository.create(data);
    return this.repository.save(newExperiences);
  }

  async updateBatch(data: Array<{ id: string; update: Partial<WorkExperience> }>): Promise<WorkExperience[]> {
    const updatedExperiences: WorkExperience[] = [];

    for (const { id, update } of data) {
      await this.repository.update(id, update);
      const updatedExperience = await this.repository.findOneBy({ _id: id });
      if (updatedExperience) {
        updatedExperiences.push(updatedExperience);
      }
    }

    return updatedExperiences;
  }

  async deleteBatch(ids: string[]): Promise<boolean[]> {
    const results: boolean[] = [];

    for (const id of ids) {
      const result = await this.repository.delete(id);
      results.push(result.affected === 1);
    }

    return results;
  }
}
