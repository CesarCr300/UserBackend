import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { env } from 'process';
import { readFileSync } from 'fs';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => {
    console.log('env.TIDB_CA_PATH', env.TIDB_CA_PATH);
    return {
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: Number.parseInt(env.DATABASE_PORT),
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
      ssl:
        env.TIDB_ENABLE_SSL === 'true'
          ? {
              minVersion: 'TLSv1.2',
              ca: env.TIDB_CA_PATH ? readFileSync(env.TIDB_CA_PATH) : null,
            }
          : null,
    };
  },
};
