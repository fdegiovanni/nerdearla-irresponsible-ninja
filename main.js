import Preload from "./scenes/Preload.js";
import Menu from "./scenes/Menu.js";
import Credits from "./scenes/Credits.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import Win from "./scenes/Win.js";

const gameOptions = {
  defaultSize: {
    width: 750,
    height: 1334,
    maxRatio: 4 / 3,
  },
  platformHeight: 0.6,
  platformGapRange: [200, 400],
  platformWidthRange: [50, 150],
  scrollTime: 250,
  poleWidth: 8,
  poleGrowTime: 400,
  poleRotateTime: 500,
  heroWalkTime: 2,
  heroFallTime: 500,
  developer: "fdegiovanni",
};
export default gameOptions;

const config = {
  title: "IRRESPONSIBLE NINJA",
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Preload, Menu, Credits, Game, GameOver, Win],
};

window.game = new Phaser.Game(config);
