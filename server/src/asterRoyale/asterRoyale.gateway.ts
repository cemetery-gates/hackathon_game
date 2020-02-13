import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import PlayerJoinData from 'src/shared/playerJoinData';
import Mob from 'src/shared/mob';

@WebSocketGateway()
export class AsterRoyaleGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('echo')
  echoEvent(@MessageBody() data: string): string {
    this.server.emit('echo', data);

    return data;
  }

  @SubscribeMessage('playerJoin')
  playerJoinEvent(@MessageBody() data: PlayerJoinData) {
    this.server.emit('playerJoin', data);
  }

  @SubscribeMessage('playerInput')
  playerInputEvent(@MessageBody() data: Mob) {
    this.server.emit('playerInput', data);
  }
}
