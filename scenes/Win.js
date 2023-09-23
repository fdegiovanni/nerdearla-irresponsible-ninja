import gameOptions from "../main.js";
import { getCoords, getGameName } from "../utils/functions.js";

export default class Win extends Phaser.Scene {
  constructor() {
    super("win");

    Object.assign(this, gameOptions);
  }

  init({ score = 0, streak = 0 }) {
    this.score = score;
    this.streak = streak;
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    const { centerX, centerY, height } = getCoords(this);

    this.add
      .text(centerX, 100, getGameName(this), {
        ...this.textFormat,
        fontSize: "40px",
        fixedWidth: 450,
        wordWrap: { width: 450 },
      })
      .setOrigin(0.5);

    const gifs = ["win1", "win2", "win3"];

    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    this.add.image(centerX, centerY + 50, gif).setScale(0.5);

    this.add
      .text(centerX, 200, "Excellent!", {
        ...this.textFormat,
        fontSize: "60px",
        color: "green",
        fixedWidth: 450,
        wordWrap: { width: 450 },
      })
      .setOrigin(0.5);

    const content = [`Score: ${this.score}`, `Streak: ${this.streak}`];
    this.add
      .text(centerX, centerY + 200, content, {
        ...this.textFormat,
        fontSize: "20px",
        color: "gray",
        fixedWidth: 450,
        wordWrap: { width: 450 },
      })
      .setOrigin(0.5);

    setTimeout(() => {
      this.scene.resume("game");
      this.scene.stop("win");
    }, 3000);
  }
}
