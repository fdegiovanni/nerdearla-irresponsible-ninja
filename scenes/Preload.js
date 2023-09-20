export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("background", "./assets/images/background.png");
    this.load.image("cover", "./assets/images/cover.png");
    this.load.spritesheet("cloud", "./assets/images/cloud.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
  }

  create() {
    this.scene.start("menu");
  }
}
