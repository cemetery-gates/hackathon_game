import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import { Scene } from 'phaser';
import { Socket } from 'socket.io-client';

export default class MainScene extends Scene {
  fpsText: Phaser.GameObjects.Text;
  socket: SocketIOClient.Socket;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {}

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0);
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#FFFFFF',
        fontSize: 24
      })
      .setOrigin(1, 0);

    this.socket = io();

    this.socket.on('echo', data => console.log(data));

    this.socket.emit('echo', 'Hello from Phaser');
  }

  update() {
    this.fpsText.update();
  }
}
