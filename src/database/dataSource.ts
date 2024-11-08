import 'reflect-metadata';
import { DataSource } from 'typeorm';
import generateConfigOptions from './generateConfigOptions';

export default new DataSource({
  ...generateConfigOptions(),
  migrations: ['src/database/migrations/*.ts'],
});
