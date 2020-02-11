import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AsterRoyaleGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('echo')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('echo', data);

    return data;
  }
}
