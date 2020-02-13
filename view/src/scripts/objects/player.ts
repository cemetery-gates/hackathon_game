import Ship from './ship';
import Mob from '../shared/mob';

export default class Player {
  destroyed = false;
  canFire: boolean = true;
  fireFunc: Function;
  scene: Phaser.Scene;
  ship: Ship;
  controls = {
    thrust: false,
    left: false,
    right: false,
    reverse: false,
    fire: false
  };

  constructor({ scene, x, y }) {
    this.scene = scene;

    this.ship = new Ship(scene, x, y);
  }

  preload() {
    this.ship.preload();
  }

  create() {
    this.ship.create();
  }

  setRemoteKeys(mob: Mob) {
    this.controls.fire = mob.shoot;
    this.controls.left = mob.turnLeft;
    this.controls.right = mob.turnRight;
    this.controls.thrust = mob.accelerate;
  }

  update() {
    if (this.destroyed) return;
    if (this.controls.thrust) {
      this.ship.accelerate = true;
    } else {
      this.ship.accelerate = false;
    }
    if (this.controls.left) {
      this.ship.startTurnLeft();
    } else if (this.controls.right) {
      this.ship.startTurnRight();
    } else if (this.controls.reverse) {
      this.ship.reverse();
    } else {
      this.ship.stopTurning();
    }

    if (this.controls.fire) {
      if (this.canFire) {
        this.canFire = false;

        let p = Phaser.Math.RotateAround(
          new Phaser.Geom.Point(this.ship.x, this.ship.y - 50),
          this.ship.x,
          this.ship.y,
          this.ship.rotation
        );
        let v = Phaser.Math.Rotate(new Phaser.Geom.Point(0, -500), this.ship.rotation);

        this.fireFunc(p.x, p.y, this.ship.body.velocity.x + v.x, this.ship.body.velocity.y + v.y, this.ship.rotation);

        this.scene.time.addEvent({
          delay: 500,
          callback: () => {
            this.canFire = true;
          },
          callbackScope: this
        });
      }
    }

    this.ship.update();
  }

  destroy() {
    this.destroyed = true;
    this.ship.destroy();
  }
}
