export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  id = -1;
  rotSpeed = Math.random() * 0.05;
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
  }

  preload() {}
  create() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCircle(5, 0, 0);
  }

  update() {}
}
