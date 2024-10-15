import { Contact } from '@/entities';
import { AppDataSource } from '@/config';
import { MongoRepository } from 'typeorm';
import { IService } from '@/services';

export class ContactService implements IService<Contact> {
  private repository: MongoRepository<Contact>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Contact);
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    const newContact = this.repository.create(data);
    return this.repository.save(newContact);
  }

  async find(): Promise<Contact[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Contact | null> {
    return this.repository.findOneBy({ _id: id });
  }

  async update(id: string, data: Partial<Contact>): Promise<Contact | null> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ _id: id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async createBatch(data: Partial<Contact>[]): Promise<Contact[]> {
    const newContacts = this.repository.create(data);
    return this.repository.save(newContacts);
  }

  async updateBatch(data: Array<{ id: string; update: Partial<Contact> }>): Promise<Contact[]> {
    const updatedContacts: Contact[] = [];

    for (const { id, update } of data) {
      await this.repository.update(id, update);
      const updatedContact = await this.repository.findOneBy({ _id: id });
      if (updatedContact) {
        updatedContacts.push(updatedContact);
      }
    }

    return updatedContacts;
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
