import { AppDataSource } from '../config/ormconfig';

export const dbConnect = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection initialized');
    }
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw new Error('Database connection failed');
  }
};
