export interface IService<T> {
    // Basic CRUD operations
    create(data: Partial<T>): Promise<T>;
    find(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
  
    // Batch operations
    createBatch(data: Partial<T>[]): Promise<T[]>;
    updateBatch(data: Array<{ id: string; update: Partial<T> }>): Promise<T[]>;
    deleteBatch(ids: string[]): Promise<boolean[]>;
  }
  