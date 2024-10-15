import { DataSource } from 'typeorm';
// import { Admin } from '../entities/Admin';
// import { Project } from '../entities/Project';
// import { WorkExperience } from '../entities/WorkExperience';
// import { Testimonial } from '../entities/Testimonial';
// import { Profile } from '../entities/Profile';
// import { Education } from '../entities/Education';
// import { Contact } from '../entities/Contact';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,  // MongoDB connection string from .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,  // Automatically sync entities with MongoDB
  logging: true,
  entities: [
    // Admin,
    // Project,
    // WorkExperience,
    // Testimonial,
    // Profile,
    // Education,
    // Contact,
  ],
});
