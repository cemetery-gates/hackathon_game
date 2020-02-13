import { Module } from '@nestjs/common';
import { AsterRoyaleGateway } from './asterRoyale.gateway';
import { AsterRoyaleController } from './asterRoyale.controller';

@Module({
  providers: [AsterRoyaleGateway],
  controllers: [AsterRoyaleController],
})
export class AsterRoyaleModule {}
