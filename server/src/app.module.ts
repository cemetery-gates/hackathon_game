import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AsterRoyaleModule } from './asterRoyale/asterRoyale.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AsterRoyaleModule,
  ],
})
export class AppModule {}
