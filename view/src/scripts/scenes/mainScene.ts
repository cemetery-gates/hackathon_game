import FpsText from '../objects/fpsText';
import { Scene } from 'phaser';
import Asteroid from '../objects/asteroid';
import Mob from '../shared/mob';
import Player from '../objects/player';
import Ship from '../objects/ship';

export default class MainScene extends Scene {
  fpsText: Phaser.GameObjects.Text;
  socket: SocketIOClient.Socket;
  rect: Phaser.Geom.Rectangle;
  players: Map<number, Player> = new Map();

  asteroids: Map<number, Asteroid> = new Map();

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    const player = new Player({ scene: this, x: 640, y: 360 });
    player.ship.setName('P1');
    player.preload();

    this.players.set(0, player);
  }

  create() {
    this.players.forEach(p => p.create());

    this.fpsText = new FpsText(this);

    this.rect = new Phaser.Geom.Rectangle(0, 0, this.cameras.main.width, this.cameras.main.height);

    this.socket = io();

    this.socket.on('echo', data => console.log(data));
    this.socket.on('mob', (data: Mob) => {
      console.log(`mobs: mob ${data.id}`);
    });

    let asteroidID = 0;
    for (asteroidID = 0; asteroidID < 10; asteroidID++) {
      const asteroid = new Asteroid(
        this,
        Math.random() * this.cameras.main.width,
        Math.random() * this.cameras.main.height
      );
      asteroid.create();

      asteroid.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
      this.asteroids.set(asteroidID, asteroid);
    }

    //this.physics.add.collider(this.getShips(), Array.from(this.asteroids.values()), colData => console.log(colData));

    this.socket.emit('echo', 'Hello from Phaser');
  }

  getShips(): Ship[] {
    return Array.from(this.players.values()).map(p => p.ship);
  }

  update() {
    this.fpsText.update();
    this.asteroids.forEach(asteroid => asteroid.update());
    this.players.forEach(player => player.update());

    this.physics.collide(this.getShips(), Array.from(this.asteroids.values()), (ship: any, asteroid: any) => {
      this.players.forEach(player => {
        if (player.ship === ship) {
          player.destroy();
        }
      });
    });

    Phaser.Actions.WrapInRectangle(Array.from(this.asteroids.values()), this.rect, 30);
    Phaser.Actions.WrapInRectangle(this.getShips(), this.rect, 20);
  }
}
