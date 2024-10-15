import { Testimonial } from '@/entities';
import { AppDataSource } from '@/config';
import { MongoRepository } from 'typeorm';
import { IService } from '@/services';

export class TestimonialService implements IService<Testimonial> {
  private repository: MongoRepository<Testimonial>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Testimonial);
  }

  async create(data: Partial<Testimonial>): Promise<Testimonial> {
    const newTestimonial = this.repository.create(data);
    return this.repository.save(newTestimonial);
  }

  async find(): Promise<Testimonial[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Testimonial | null> {
    return this.repository.findOneBy({ _id: id });
  }

  async update(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ _id: id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async createBatch(data: Partial<Testimonial>[]): Promise<Testimonial[]> {
    const newTestimonials = this.repository.create(data);
    return this.repository.save(newTestimonials);
  }

  async updateBatch(data: Array<{ id: string; update: Partial<Testimonial> }>): Promise<Testimonial[]> {
    const updatedTestimonials: Testimonial[] = [];

    for (const { id, update } of data) {
      await this.repository.update(id, update);
      const updatedTestimonial = await this.repository.findOneBy({ _id: id });
      if (updatedTestimonial) {
        updatedTestimonials.push(updatedTestimonial);
      }
    }

    return updatedTestimonials;
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
