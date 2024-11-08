import { DataSourceOptions } from 'typeorm';

const getFromDefaultEnv = (key: string) => process.env[key];

export default (envProviderGetter = getFromDefaultEnv): DataSourceOptions => ({
  type: 'postgres',
  host: envProviderGetter('DB_HOST'),
  port: parseInt(envProviderGetter('DB_PORT'), 10),
  username: envProviderGetter('DB_USERNAME'),
  password: envProviderGetter('DB_PASSWORD'),
  database: envProviderGetter('DB_NAME'),
});
