import { Controller, Get, Param } from '@nestjs/common';
import PlayerJoinData from 'src/shared/playerJoinData';
import { WebSocketServer } from '@nestjs/websockets';
import PlayerData from 'src/classes/PlayerData';
import { Server } from 'socket.io';
import { AsterRoyaleGateway } from './asterRoyale.gateway';

@Controller('/')
export class AsterRoyaleController {
  constructor(private readonly gateway: AsterRoyaleGateway) {}

  playerData: Map<string, PlayerData> = new Map();

  nextPlayerID = 0;

  @Get('register/:name')
  registerPlayer(@Param() params): PlayerJoinData {
    const player = new PlayerData();
    player.name = params.name;
    player.id = this.nextPlayerID;
    this.nextPlayerID++;
    this.playerData.set(player.name, player);

    const joinData: PlayerJoinData = { id: player.id, name: player.name };

    this.gateway.server.emit('playerJoin', joinData);
    return joinData;
  }
}
