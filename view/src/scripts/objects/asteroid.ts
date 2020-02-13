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

  explode() {
    const emitter = this.scene.add.particles('smoke').createEmitter({
      x: this.x,
      y: this.y,
      speed: { min: -500, max: 500 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.2, end: 0 },
      blendMode: 'SCREEN',
      active: true,
      lifespan: 100,
      tint: 0xcccccc
    });

    setTimeout(() => emitter.stop(), 100);
    setTimeout(() => {
      emitter.remove();
    }, 200);
  }
}
