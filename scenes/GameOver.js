import { getCoords, getGameName } from "../utils/functions.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  init({ score = 0 }) {
    this.score = score;
  }

  create() {
    const { centerX, centerY, height } = getCoords(this);

    const styleText = {
      fontSize: "40px",
      color: "#fff",
      fixedWidth: 450,
      wordWrap: { width: 450 },
      align: "center",
    };

    this.add
      .text(centerX, 100, getGameName(this), {
        ...styleText,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 200, "Game Over", {
        ...styleText,
        fontSize: "48px",
        color: "red",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY, `Score: ${this.score}`, {
        ...styleText,
        fontSize: "20px",
        color: "gray",
      })
      .setOrigin(0.5);

    let restartIcon = this.add
      .sprite(centerX - 120, height - 10, "icons")
      .setOrigin(0.5)
      .setInteractive()
      .on(
        "pointerup",
        function () {
          this.scene.start("game");
        },
        this
      );

    let homeIcon = this.add
      .sprite(centerX + 120, height - 10, "icons")
      .setOrigin(0.5)
      .setFrame(1)
      .setInteractive()
      .on(
        "pointerup",
        function () {
          this.scene.start("menu");
        },
        this
      );

    this.tweens.add({
      targets: [restartIcon, homeIcon],
      y: centerY + 180,
      duration: 800,
      ease: "Cubic.easeIn",
    });
  }
}
