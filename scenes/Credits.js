export default class Credits extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  init() {}

  preload() {}

  create() {
    // add color to the background
    this.cameras.main.setBackgroundColor("#000000");
    this.add.text(250, 250, "Gracias por jugar", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.add.text(250, 300, "Desarrollado por: [Nombre del Desarrollador]", {
      fontSize: "24px",
      fill: "#fff",
    });

    this.add.text(250, 350, "[Frase de Agradecimiento]", {
      fontSize: "24px",
      fill: "#fff",
    });

    const backButton = this.add.text(250, 400, "Volver", {
      fontSize: "24px",
      fill: "#fff",
    });

    backButton.setInteractive({ useHandCursor: true });

    backButton.on("pointerup", () => {
      this.scene.resume("menu");
      this.scene.stop("credits");
    });
  }

  update() {}
}
