export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("nerdearla", "./assets/images/nerdearla.png");
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
    this.load.spritesheet("icons", "./assets/images/icons.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.image(
      "win1",
      "https://media.tenor.com/z7LfGbHxFs4AAAAd/bh187-beverly-hills-ninja.gif"
    );
    this.load.image(
      "win2",
      "https://media.tenor.com/O6UyDzl8CC4AAAAd/bh187-beverly-hills-ninja.gif"
    );
    this.load.image(
      "win3",
      "https://i.pinimg.com/originals/b8/25/10/b8251034bd24a82076c35b0ebb963060.gif"
    );
    this.load.image("clock", "./assets/images/clock.png");
    this.load.image("energybar", "./assets/images/energybar.png");
    this.load.image("whitetile", "./assets/images/whitetile.png");

    this.load.audio("death", [
      "assets/sounds/death.mp3",
      "assets/sounds/death.ogg",
    ]);
    this.load.audio("run", [
      "./assets/sounds/run.mp3",
      "./assets/sounds/run.ogg",
    ]);
    this.load.audio("stick", [
      "./assets/sounds/stick.mp3",
      "./assets/sounds/stick.ogg",
    ]);
    this.load.audio("grow", [
      "./assets/sounds/grow.mp3",
      "./assets/sounds/grow.ogg",
    ]);
    this.load.audio("pick", [
      "./assets/sounds/pick.mp3",
      "./assets/sounds/pick.ogg",
    ]);
    this.load.audio("click", [
      "./assets/sounds/click.mp3",
      "./assets/sounds/click.ogg",
    ]);
  }

  create() {
    this.addNerdearlaLogo();
    this.addAnimations();
  }

  addNerdearlaLogo() {
    const { centerX, centerY } = this.cameras.main;
    this.nerdearla = this.add
      .image(centerX, centerY, "nerdearla")
      .setScale(0.65)
      .setAlpha(0);

    this.add.tween({
      targets: [this.nerdearla],
      ease: "linear",
      alpha: 1,
      duration: 5000,
      onComplete: () => {
        this.add.tween({
          targets: [this.nerdearla],
          scale: 0.8,
          duration: 5000,
          easing: "linear",
          onComplete: () => {
            this.scene.start("menu");
          },
        });
      },
    });
  }

  addAnimations() {
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
  }
}
