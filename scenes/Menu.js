import gameOptions from "../main.js";
import {
  getCoords,
  getGameName,
  getStoredScore,
  addSounds,
  playSound,
} from "../utils/functions.js";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
    window.soundOn = true;
    Object.assign(this, gameOptions);
  }

  init() {
    const { best } = getStoredScore();
    this.best = best;
  }

  create() {
    addSounds(this);
    this.coords = getCoords(this);
    this.addBackground();
    this.addCover();
    this.addTexts();
    this.addInteractions();
    this.addSoundButton();
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
        ...this.textFormat,
        fixedWidth: 450,
        wordWrap: { width: 450 },
      })
      .setOrigin(0.5);

    this.bestText = this.add
      .text(centerX, height - 110, `BEST: ${this.best}`, {
        ...this.textFormat,
        fontSize: "26px",
        fixedWidth: 450,
        wordWrap: { width: 450 },
      })
      .setOrigin(0.5);

    this.creditsButton = this.add.text(width - 150, height - 30, "CREDITS", {
      ...this.textFormat,
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
      playSound(this.sounds.click);
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
      playSound(this.sounds.click);
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

  addSoundButton() {
    const { centerX, height } = this.coords;
    this.soundButton = this.add
      .sprite(centerX, height - 50, "icons")
      .setScale(0.5)
      .setFrame(window.soundOn ? 2 : 3)
      .setInteractive()
      .on(
        "pointerup",
        function () {
          window.soundOn = !window.soundOn;
          this.soundButton.setFrame(window.soundOn ? 2 : 3);

          playSound(this.sounds.click);
        },
        this
      );
  }
}
