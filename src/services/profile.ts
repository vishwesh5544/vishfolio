import { Profile } from '@/entities';
import { AppDataSource } from '@/config';
import { MongoRepository } from 'typeorm';
import { IService } from '@/services';

export class ProfileService implements IService<Profile> {
  private repository: MongoRepository<Profile>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Profile);
  }

  async create(data: Partial<Profile>): Promise<Profile> {
    const newProfile = this.repository.create(data);
    return this.repository.save(newProfile);
  }

  async find(): Promise<Profile[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Profile | null> {
    return this.repository.findOneBy({ _id: id });
  }

  async update(id: string, data: Partial<Profile>): Promise<Profile | null> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ _id: id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async createBatch(data: Partial<Profile>[]): Promise<Profile[]> {
    const newProfiles = this.repository.create(data);
    return this.repository.save(newProfiles);
  }

  async updateBatch(data: Array<{ id: string; update: Partial<Profile> }>): Promise<Profile[]> {
    const updatedProfiles: Profile[] = [];

    for (const { id, update } of data) {
      await this.repository.update(id, update);
      const updatedProfile = await this.repository.findOneBy({ _id: id });
      if (updatedProfile) {
        updatedProfiles.push(updatedProfile);
      }
    }

    return updatedProfiles;
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
