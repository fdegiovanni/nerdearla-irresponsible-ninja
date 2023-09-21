export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("background", "./assets/images/background.png");
    this.load.image("cover", "./assets/images/cover-removebg.png");
    this.load.spritesheet("cloud", "./assets/images/cloud.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.image("tile", "./assets/images/tile.png");
    this.load.spritesheet("hero", "./assets/images/hero.png", {
      frameWidth: 77,
      frameHeight: 97,
    });
  }

  create() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 0,
        end: 11,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 12,
        end: 19,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.scene.start("menu");
  }
}
