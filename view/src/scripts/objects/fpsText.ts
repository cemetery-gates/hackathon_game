export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(scene, 10, 10, '', { color: 'white', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
  }

  public update() {
    this.setText(`FPS: ${Math.floor(this.scene.game.loop.actualFps)}`);
  }
}
