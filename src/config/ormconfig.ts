import { Project, WorkExperience, Testimonial, Profile, Education, Contact } from '@/entities';
import { Admin, DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,  // MongoDB connection string from .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,  // Automatically sync entities with MongoDB
  logging: true,
  entities: [
    Admin,
    Project,
    WorkExperience,
    Testimonial,
    Profile,
    Education,
    Contact,
  ],
});
