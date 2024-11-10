import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users';
import { DatabaseModule } from './database';
import { ProductModule } from './products';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
