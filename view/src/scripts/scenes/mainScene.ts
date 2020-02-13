import FpsText from '../objects/fpsText';
import { Scene } from 'phaser';
import Asteroid from '../objects/asteroid';
import Mob from '../shared/mob';
import Player from '../objects/player';
import Ship from '../objects/ship';
import Bullet from '../objects/bullet';

export default class MainScene extends Scene {
  fpsText: Phaser.GameObjects.Text;
  socket: SocketIOClient.Socket;
  rect: Phaser.Geom.Rectangle;
  players: Map<number, Player> = new Map();
  asteroids: Asteroid[] = [];
  bullets: Bullet[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    const player = new Player({ scene: this, x: 640, y: 360 });
    player.ship.setName('P1');
    const me = this;
    player.fireFunc = (x: number, y: number, dx: number, dy: number, rotation: number) => {
      me.fireBullet(x, y, dx, dy, rotation);
    };
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
      const p = this.asteroidStart();
      const asteroid = new Asteroid(this, p.x, p.y);
      asteroid.create();

      asteroid.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
      this.asteroids.push(asteroid);
    }

    this.socket.emit('echo', 'Hello from Phaser');
  }

  getShips(): Ship[] {
    return Array.from(this.players.values()).map(p => p.ship);
  }

  asteroidStart(): Phaser.Math.Vector2 {
    let x = Phaser.Math.Between(0, this.cameras.main.width);
    let y = Phaser.Math.Between(0, this.cameras.main.height);
    if (Math.random() < 0.5) {
      x = -30;
    } else {
      y = -30;
    }

    return new Phaser.Math.Vector2(x, y);
  }

  update() {
    this.fpsText.update();
    this.asteroids.forEach(asteroid => asteroid.update());
    this.players.forEach(player => player.update());

    this.physics.overlap(this.getShips(), this.asteroids, (ship: any, asteroid: any) => {
      this.players.forEach(player => {
        if (player.ship === ship) {
          player.destroy();
        }
      });
    });

    this.physics.overlap(this.bullets, this.asteroids, (bullet: any, a) => {
      const asteroid = a as Asteroid;
      bullet.destroy();

      asteroid.disableBody(true, true);
      asteroid.explode();
      setTimeout(() => {
        const p = this.asteroidStart();
        asteroid.enableBody(true, p.x, p.y, true, true);
        asteroid.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
      }, 1000);
    });

    Phaser.Actions.WrapInRectangle(this.asteroids, this.rect, 30);
    Phaser.Actions.WrapInRectangle(this.getShips(), this.rect, 20);
  }

  fireBullet(x: number, y: number, dx: number, dy: number, rotation: number) {
    let bullet = new Bullet(this, x, y);
    bullet.create();
    bullet.setRotation(rotation);
    bullet.setVelocity(dx, dy);

    this.bullets.push(bullet);
    setTimeout(() => {
      this.bullets.pop();
      bullet.destroy();
    }, 500);
  }
}
