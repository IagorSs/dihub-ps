import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import generateConfigOptions from './generateConfigOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...generateConfigOptions((key) => configService.get(key)),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export default class DatabaseModule {}
