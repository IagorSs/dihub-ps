import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;
  // TODO change to CPF type
  // - Object Value
  // - Add check on constructor
  // - Add check on DB

  @Column()
  email: string;
  // TODO change to Email type
  // - Object Value
  // - Add check on constructor
  // - Add check on DB

  @Column()
  password: string;
  // TODO change to Password type
  // - Object Value
  // - checks: min qtde, min letters, others mins
  // - Add check on constructor
  // - Add check on DB
}
