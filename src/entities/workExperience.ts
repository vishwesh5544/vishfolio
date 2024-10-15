import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';  // Correctly import ObjectId from mongodb

@Entity()
export class WorkExperience {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column()
  description: string;

  @Column()
  technologies: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
