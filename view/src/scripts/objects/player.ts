import Ship from './ship';

export default class Player {
  destroyed = false;
  canFire: boolean = true;
  fireFunc: Function;
  scene: Phaser.Scene;
  ship: Ship;
  controls: {
    thrustKey: Phaser.Input.Keyboard.Key;
    leftKey: Phaser.Input.Keyboard.Key;
    rightKey: Phaser.Input.Keyboard.Key;
    reverseKey: Phaser.Input.Keyboard.Key;
    fireKey: Phaser.Input.Keyboard.Key;
  };

  constructor({ scene, x, y }) {
    this.scene = scene;

    this.ship = new Ship(scene, x, y);
  }

  preload() {
    this.buildInputs();
    this.ship.preload();
  }

  create() {
    this.ship.create();
  }

  update() {
    if (this.destroyed) return;
    if (this.controls.thrustKey.isDown) {
      this.ship.accelerate = true;
    } else {
      this.ship.accelerate = false;
    }
    if (this.controls.leftKey.isDown) {
      this.ship.startTurnLeft();
    } else if (this.controls.rightKey.isDown) {
      this.ship.startTurnRight();
    } else if (this.controls.reverseKey.isDown) {
      this.ship.reverse();
    } else {
      this.ship.stopTurning();
    }

    if (this.controls.fireKey.isDown) {
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

  buildInputs() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    const { down, left, right, up, shift, space } = cursors;

    this.controls = {
      leftKey: left as Phaser.Input.Keyboard.Key,
      rightKey: right as Phaser.Input.Keyboard.Key,
      thrustKey: up as Phaser.Input.Keyboard.Key,
      reverseKey: down as Phaser.Input.Keyboard.Key,
      fireKey: space as Phaser.Input.Keyboard.Key
    };
  }

  destroy() {
    this.destroyed = true;
    this.ship.destroy();
  }
}
