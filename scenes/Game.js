import gameOptions from "../main.js";
import { getCoords } from "../utils/functions.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");

    /* `Object.assign(this, gameOptions);` is assigning the properties and values from the
    `gameOptions` object to the `this` object. This allows the `Game` class to access the properties
    defined in `gameOptions` as if they were its own properties. */
    Object.assign(this, gameOptions);
  }

  init() {}

  create() {
    this.coords = getCoords(this);

    this.addBackground();
    this.addClouds();
    this.addPlatforms();
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

  addClouds() {
    let clouds = Math.ceil(this.coords.width / 128);
    let cloudsArray = [];

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= clouds; j++) {
        let cloud = this.add.sprite(
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

  addPlatform(posX) {
    const platform = this.add.sprite(
      posX,
      this.coords.height * this.platformHeight,
      "tile"
    );

    const width = (this.platformWidthRange[0] + this.platformWidthRange[1]) / 2;

    platform.displayWidth = width;
    platform.displayHeight =
      this.coords.height * (1 - this.platformHeight) + 50;
    platform.setOrigin(0, 0);

    return platform;
  }

  tweenPlatform() {
    const rightBound = this.platforms[this.mainPlatform].getBounds().right;
    const minGap = this.platformGapRange[0];
    const maxGap = this.platformGapRange[1];

    const gap = Phaser.Math.Between(minGap, maxGap);
    const destination = rightBound + gap;
    const minWidth = this.platformWidthRange[0];
    const maxWidth = this.platformWidthRange[1];

    const width = Phaser.Math.Between(minWidth, maxWidth);

    this.platforms[1 - this.mainPlatform].displayWidth = width;

    this.tweens.add({
      targets: [this.platforms[1 - this.mainPlatform]],
      x: destination,
      duration: this.scrollTime,
    });
  }

  addPlatforms() {
    this.mainPlatform = 0;
    this.platforms = [
      this.addPlatform((this.coords.width - this.defaultSize.width) / 2),
      this.addPlatform(this.coords.width),
    ];
    this.tweenPlatform();
  }
}
