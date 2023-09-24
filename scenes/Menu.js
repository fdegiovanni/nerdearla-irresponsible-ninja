export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    this.add.image(400, 300, "cover");

    this.add.text(300, 400, "¡Bienvenido al Menú!", {
      fontSize: "32px",
      fill: "#fff",
    });

    const creditsButton = this.add.text(300, 450, "Créditos", {
      fontSize: "24px",
      fill: "#fff",
    });

    const gameButton = this.add.text(300, 500, "Jugar", {
      fontSize: "24px",
      fill: "#fff",
    });

    creditsButton.setInteractive({ useHandCursor: true });
    gameButton.setInteractive({ useHandCursor: true });

    creditsButton.on("pointerup", () => {
      this.scene.launch("credits");
    });

    gameButton.on("pointerup", () => {
      this.scene.start("game");
    });
  }
}
