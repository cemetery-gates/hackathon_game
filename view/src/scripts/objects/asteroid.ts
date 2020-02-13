export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
  id = -1;
  rotSpeed = Math.random() * 0.05;
  constructor(scene, x, y) {
    super(scene, x, y, 'asteroid');
    this.setScale(0.5);
  }

  preload() {}
  create() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCircle(75, 80, 50);
  }

  update() {
    this.setRotation(this.rotation + this.rotSpeed);
  }
}
