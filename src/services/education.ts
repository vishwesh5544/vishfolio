
import { Education } from '@/entities';
import { AppDataSource } from '@/config';
import { MongoRepository } from 'typeorm';
import { IService } from '@/services';

export class EducationService implements IService<Education> {
  private repository: MongoRepository<Education>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Education);
  }

  async create(data: Partial<Education>): Promise<Education> {
    const newEducation = this.repository.create(data);
    return this.repository.save(newEducation);
  }

  async find(): Promise<Education[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Education | null> {
    return this.repository.findOneBy({ _id: id });
  }

  async update(id: string, data: Partial<Education>): Promise<Education | null> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ _id: id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async createBatch(data: Partial<Education>[]): Promise<Education[]> {
    const newEducation = this.repository.create(data);
    return this.repository.save(newEducation);
  }

  async updateBatch(data: Array<{ id: string; update: Partial<Education> }>): Promise<Education[]> {
    const updatedEducation: Education[] = [];

    for (const { id, update } of data) {
      await this.repository.update(id, update);
      const updatedEdu = await this.repository.findOneBy({ _id: id });
      if (updatedEdu) {
        updatedEducation.push(updatedEdu);
      }
    }

    return updatedEducation;
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
