export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  create() {
    this.addBackground();

    // Aquí agregarías la lógica y los elementos del juego, como jugador, enemigos, etc.
  }

  update() {}

  addBackground() {
    this.background = this.add.sprite(400, 300, "background");
    this.background.displayWidth = this.sys.game.config.width + 100;
    this.background.displayHeight = this.sys.game.config.height + 100;
  }
}
