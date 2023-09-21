import gameOptions from "../main.js";
import { getGameName, getCoords } from "../utils/functions.js";

export default class Credits extends Phaser.Scene {
  constructor() {
    super("credits");

    Object.assign(this, gameOptions);
  }

  create() {
    const gameName = getGameName(this);
    const { centerX, centerY, height, width } = getCoords(this);
    this.cameras.main.setBackgroundColor("#000000");

    this.add
      .text(centerX, 100, gameName, {
        fontSize: "48px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 180, "Gracias por jugar", {
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, 250, `Desarrollado por: ${this.developer}`, {
        fontSize: "24px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    const content = [
      "",
      "Este juego fue diseñado originalmente por",
      "Emanuele Feronato",
      "Que es un desarrollador de juegos de Italia.",
      "https://www.emanueleferonato.com/",
      "",
      "Este juego fue adaptado por",
      "Federico Degiovanni",
    ];

    this.add
      .text(centerX, centerY + 100, content, {
        fontSize: "20px",
        color: "grey",
        align: "center",
      })
      .setOrigin(0.5);

    const backButton = this.add
      .image(width - 100, height - 80, "cover")
      .setScale(0.5)
      .setInteractive({ useHandCursor: true, pixelPerfect: true });

    backButton
      .on("pointerover", () => {
        backButton.setScale(0.7);
      })
      .on("pointerout", () => {
        backButton.setScale(0.5);
      })
      .on("pointerup", () => {
        this.scene.resume("menu");
        this.scene.stop("credits");
      });
  }
}
