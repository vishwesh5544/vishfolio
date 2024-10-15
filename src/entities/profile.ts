import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb'; 

@Entity()
export class Profile {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column()
  imageUrl: string;

  @Column()
  contactEmail: string;

  @Column({ nullable: true })
  linkedinUrl?: string;

  @Column({ nullable: true })
  githubUrl?: string;

  @Column({ nullable: true })
  websiteUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
