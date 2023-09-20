import { getCoords } from "../utils/functions.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  create() {
    this.coords = getCoords(this);

    this.addBackground();
    this.addClouds();
  }

  update() {}

  addBackground() {
    this.background = this.add.sprite(400, 300, "background");
    this.background.displayWidth = this.coords.width + 100;
    this.background.displayHeight = this.coords.height + 100;
  }

  addClouds() {
    const clouds = Math.ceil(this.coords.width / 128);
    const cloudsArray = [];

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= clouds; j++) {
        const cloud = this.add.sprite(
          128 * j + Phaser.Math.Between(-10, 10),
          this.coords.height + i * 32 + Phaser.Math.Between(-10, 10),
          "cloud"
        );
        cloud.setFrame(i);
        cloudsArray.push(cloud);
      }
    }

    this.tweens.add({
      targets: cloudsArray,
      props: {
        x: {
          value: {
            getEnd: function (target, key, value) {
              return target.x + Phaser.Math.Between(-10, 10);
            },
          },
        },
        y: {
          value: {
            getEnd: function (target, key, value) {
              return target.y + Phaser.Math.Between(-10, 10);
            },
          },
        },
      },
      duration: 3000,
      repeat: -1,
      yoyo: true,
    });
  }
}
