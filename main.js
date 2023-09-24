import Preload from "./scenes/Preload.js";
import Menu from "./scenes/Menu.js";
import Credits from "./scenes/Credits.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Preload, Menu, Credits, Game, GameOver],
};

window.game = new Phaser.Game(config);
