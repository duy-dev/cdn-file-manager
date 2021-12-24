import { Module } from '@nestjs/common';
import { RsaService } from './services/rsa.service';

@Module({
  providers: [RsaService],
  exports: [RsaService],
})
export class SharedModule {}
