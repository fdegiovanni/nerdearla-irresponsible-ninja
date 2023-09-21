import { getCoords, getGameName, getStoredScore } from "../utils/functions.js";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  init() {
    const { best } = getStoredScore();
    this.best = best;
  }

  create() {
    this.coords = getCoords(this);
    this.addBackground();
    this.addCover();
    this.addTexts();
    this.addInteractions();
  }

  addBackground() {
    const { centerX, centerY, width, height } = this.coords;
    this.background = this.add.sprite(centerX, centerY, "background");
    this.background.displayWidth = width + 100;
    this.background.displayHeight = height + 100;
  }

  addTexts() {
    const { centerX, width, height } = this.coords;

    this.title = this.add
      .text(centerX, 100, getGameName(this), {
        fontSize: "48px",
        color: "#fff",
        fixedWidth: 450,
        wordWrap: { width: 450 },
        align: "center",
      })
      .setOrigin(0.5);

    this.bestText = this.add
      .text(centerX, height - 85, `Best: ${this.best}`, {
        fontSize: "26px",
        color: "#fff",
        fixedWidth: 450,
        wordWrap: { width: 450 },
        align: "center",
      })
      .setOrigin(0.5);

    this.creditsButton = this.add.text(width - 150, height - 30, "Créditos", {
      fontSize: "24px",
      fill: "#fff",
    });
  }

  addCover() {
    const { centerX, centerY } = this.coords;
    this.cover = this.add
      .image(centerX, centerY, "cover")
      .setInteractive(this.input.makePixelPerfect());
  }

  addInteractions() {
    const { height } = this.coords;

    this.creditsButton.setInteractive({ useHandCursor: true });

    this.creditsButton.on("pointerup", () => {
      this.scene.pause();
      this.scene.launch("credits");
    });

    this.cover.on("pointerover", () => {
      this.cover.setScale(1.1);
    });

    this.cover.on("pointerout", () => {
      this.cover.setScale(1);
    });

    this.cover.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.add.tween({
        targets: [this.cover, this.title],
        ease: "Bounce.easeIn",
        y: -200,
        duration: 1000,
        onComplete: () => {
          this.scene.start("game");
        },
      });

      this.add.tween({
        targets: [this.scoreText, this.bestText],
        ease: "Bounce.easeIn",
        y: height + 100,
        duration: 300,
      });
    });
  }
}
