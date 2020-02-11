import { Module } from '@nestjs/common';
import { AsterRoyaleGateway } from './asterRoyale.gateway';

@Module({
  providers: [AsterRoyaleGateway],
})
export class AsterRoyaleModule {}
