import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
import { LinkRepository } from './links.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkRepository]),
    SharedModule,
    HttpModule,
  ],
  controllers: [KeyController],
  providers: [KeyService],
})
export class KeyModule {}
