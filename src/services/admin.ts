import { Admin } from "@/entities";
import { AppDataSource } from "@/config";
import { IService } from "@/services";
import { MongoRepository } from "typeorm";

export class AdminService implements IService<Admin> {
    private repository: MongoRepository<Admin>;

    constructor() {
        this.repository = AppDataSource.getMongoRepository(Admin);
    }

    async create(data: Partial<Admin>): Promise<Admin> {
        const newAdmin = this.repository.create(data);
        return this.repository.save(newAdmin);
    }

    async find(): Promise<Admin[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Admin | null> {
        return this.repository.findOneBy({ _id: id });
    }

    async update(id: string, data: Partial<Admin>): Promise<Admin | null> {
        await this.repository.update(id, data);
        return this.repository.findOneBy({ _id: id });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }

    async createBatch(data: Partial<Admin>[]): Promise<Admin[]> {
        const newAdmins = this.repository.create(data);
        return this.repository.save(newAdmins);
    }

    async updateBatch(data: Array<{ id: string; update: Partial<Admin> }>): Promise<Admin[]> {
        const updatedAdmins: Admin[] = [];

        for (const { id, update } of data) {
            await this.repository.update(id, update);
            const updatedAdmin = await this.repository.findOneBy({ _id: id });
            if (updatedAdmin) {
                updatedAdmins.push(updatedAdmin);
            }
        }

        return updatedAdmins;
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
