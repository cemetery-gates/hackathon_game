import Ship from './ship';

export default class Player {
  destroyed = false;
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
      this.ship.fire();
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
