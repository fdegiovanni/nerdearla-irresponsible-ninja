export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("background", "./assets/images/background.png");
    this.load.image("cover", "./assets/images/cover.png");
  }

  create() {
    this.scene.start("menu");
  }
}
