export default class Ship extends Phaser.Physics.Arcade.Sprite {
  _accelerating: boolean = false;
  _turnValue: integer = 0;
  _thrustEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  _fireTimer: integer = 0;

  constructor(scene, x, y) {
    super(scene, x, y, 'ship');
    this.setScale(0.5);
  }

  preload() {
    this.scene.load.image('thrust', 'assets/particles/circle_05.png');
  }

  create() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCircle(30, 18, 12);

    var particles = this.scene.add.particles('thrust');

    this._thrustEmitter = particles.createEmitter({
      lifespan: { min: 100, max: 500 },
      speed: { min: 150, max: 200 },
      followOffset: new Phaser.Math.Vector2(0, 50 * this.scale),
      scale: { start: 0.1, end: 0.0 },
      alpha: { start: 1.0, end: 0.0 },
      blendMode: 'ADD',
      angle: { min: 70, max: 110 },
      follow: this
    });
  }

  update() {
    if (this._accelerating) {
      this._thrustEmitter.setAngle({ min: this.angle + 70, max: this.angle + 110 });
      this._thrustEmitter.followOffset = new Phaser.Math.Vector2(
        Phaser.Math.Rotate(new Phaser.Geom.Point(0, 50 * this.scale), this.rotation)
      );
    }

    this.rotation += this._turnValue;
  }

  destroy() {
    this._thrustEmitter.stop();
    const emitter = this.scene.add.particles('thrust').createEmitter({
      x: this.x,
      y: this.y,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.3, end: 0 },
      blendMode: 'SCREEN',
      active: true,
      lifespan: 250
    });

    setTimeout(() => emitter.stop(), 250);
    setTimeout(() => {
      emitter.remove();
      this._thrustEmitter.remove();
    }, 500);
    super.destroy();
  }

  get accelerate(): boolean {
    return this._accelerating;
  }

  set accelerate(value: boolean) {
    this._accelerating = value;
    if (value) {
      let p = Phaser.Math.Rotate(new Phaser.Geom.Point(0, -100), this.rotation);
      this.setAcceleration(p.x, p.y);
      this._thrustEmitter.start();
    } else {
      this.setAcceleration(0, 0);
      this._thrustEmitter.stop();
    }
  }

  startTurnRight() {
    this._turnValue = 0.05;
  }

  startTurnLeft() {
    this._turnValue = -0.05;
  }

  stopTurning() {
    this._turnValue = 0;
  }

  reverse() {
    if (Phaser.Math.Fuzzy.GreaterThan(this.body.velocity.length(), 1)) {
      let angle = Phaser.Math.Angle.Normalize(
        Phaser.Math.Angle.BetweenPoints({ x: 0, y: 0 }, this.body.velocity) - Phaser.Math.DEG_TO_RAD * 90
      );
      let shipAngle = Phaser.Math.Angle.Normalize(this.rotation);

      if (Phaser.Math.Fuzzy.Equal(angle, shipAngle)) {
        this.accelerate = true;
      } else {
        this.rotation = Phaser.Math.Angle.RotateTo(shipAngle, angle, 0.05);
      }
    } else {
      this._turnValue = 0;
      this.setVelocity(0, 0);
    }
  }
}
