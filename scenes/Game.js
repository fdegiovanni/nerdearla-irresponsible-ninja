import gameOptions from "../main.js";
import {
  getCoords,
  getStoredScore,
  setStoredScore,
} from "../utils/functions.js";
import { IDLE, WAITING_START, WAITING_STOP } from "../utils/InputStatus.js";
import { SUCCESS, TOO_SHORT, TOO_LONG } from "../utils/PoleStatus.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");

    this.points = getStoredScore();
    this.mountains = 0;
    this.timeLeft = 30;
    /* `Object.assign(this, gameOptions);` is assigning the properties and values from the
    `gameOptions` object to the `this` object. This allows the `Game` class to access the properties
    defined in `gameOptions` as if they were its own properties. */
    Object.assign(this, gameOptions);
    this.gameMode = WAITING_START;
  }

  init() {
    this.mountains = 0;
    this.points = getStoredScore();
  }

  create() {
    this.coords = getCoords(this);

    this.addBackground();
    this.addClouds();
    this.addPlatforms();
    this.addPole();
    this.addHero();

    this.addGameInfo();

    // input management
    this.input.on("pointerdown", this.handlePointerDown, this);
    this.input.on("pointerup", this.handlePointerUp, this);
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

  addPole() {
    const bounds = this.platforms[this.mainPlatform].getBounds();
    this.pole = this.add.sprite(
      bounds.right - this.poleWidth,
      bounds.top,
      "tile"
    );

    this.pole.setOrigin(1, 1);
    this.pole.displayWidth = this.poleWidth;
    this.pole.displayHeight = this.poleWidth;
  }

  addHero() {
    const platformBounds = this.platforms[this.mainPlatform].getBounds();
    const heroPosX = platformBounds.right - this.poleWidth;
    const heroPosY = platformBounds.top;

    this.hero = this.add
      .sprite(heroPosX, heroPosY, "hero")
      .setOrigin(1, 1)
      .play("idle");
  }

  getRules() {
    const platformBounds = this.platforms[1 - this.mainPlatform].getBounds();
    const heroBounds = this.hero.getBounds();
    const poleBounds = this.pole.getBounds();

    const rules = {
      [SUCCESS]: {
        heroDestination: platformBounds.right - this.poleWidth,
        methods: ["nextPlatform"],
      },
      [TOO_SHORT]: {
        heroDestination: poleBounds.right,
        methods: ["poleFallDown", "fallAndDie"],
      },
      [TOO_LONG]: {
        heroDestination: poleBounds.right + heroBounds.width / 2,
        methods: ["fallAndDie"],
      },
    };
    return rules;
  }

  moveHero(poleStatus) {
    this.hero.play("run");
    const { heroDestination, methods } = this.getRules()[poleStatus];

    const scene = this;

    this.walkTween = this.tweens.add({
      targets: [this.hero],
      x: heroDestination,
      duration: this.heroWalkTime * this.pole.displayHeight,
      callbackScope: this,
      onComplete: function () {
        methods.forEach((method) => {
          scene[method]();
        });
      },
      onUpdate: function () {
        const heroBounds = this.hero.getBounds();
        const poleBounds = this.pole.getBounds();
        const platformBounds =
          this.platforms[1 - this.mainPlatform].getBounds();
        if (
          heroBounds.centerX > poleBounds.left &&
          heroBounds.centerX < poleBounds.right
        ) {
          this.hero.y = poleBounds.top;
        } else {
          this.hero.y = platformBounds.top;
        }
      },
    });
  }

  handlePointerDown() {
    if (this.gameMode === WAITING_START) {
      this.gameMode = WAITING_STOP;

      const maxPoleWidth =
        this.platformGapRange[1] + this.platformWidthRange[1];

      this.growTween = this.tweens.add({
        targets: [this.pole],
        displayHeight: maxPoleWidth + 50,
        duration: this.poleGrowTime,
      });

      if (this.firstMove) {
        this.info.visible = false;
        this.showGameScore();
        this.addGameTimer();
      }
    }
  }

  poleFallDown() {
    this.tweens.add({
      targets: [this.pole],
      angle: 180,
      duration: this.poleRotateTime,
      ease: "Cubic.easeIn",
    });
  }

  fallAndDie() {
    this.gameTimer?.remove();

    this.tweens.add({
      targets: [this.hero],
      y: this.coords.height + this.hero.displayHeight * 2,
      angle: 180,
      duration: this.heroFallTime,
      ease: "Cubic.easeIn",
      callbackScope: this,
      onComplete: function () {
        this.cameras.main.shake(200, 0.01);
        setTimeout(() => {
          this.showGameOver();
        }, 220);
      },
    });
  }

  nextPlatform() {
    this.hero.anims.play("idle");
    this.hero.y = this.platforms[this.mainPlatform].getBounds().top;
    const rightPlatformPosition = this.platforms[1 - this.mainPlatform].x;
    const distance =
      this.platforms[1 - this.mainPlatform].x -
      this.platforms[this.mainPlatform].x;

    this.tweens.add({
      targets: [this.hero, this.pole, this.platforms[0], this.platforms[1]],
      props: {
        x: {
          value: "-= " + distance,
        },
        alpha: {
          value: {
            getEnd: function (target, key, value) {
              if (target.x < rightPlatformPosition) {
                return 0;
              }
              return 1;
            },
          },
        },
      },
      duration: this.scrollTime,
      callbackScope: this,
      onComplete: function () {
        this.prepareNextMove();
      },
    });
  }

  prepareNextMove() {
    this.mountains++;
    this.points.streak++;
    this.updateScore();

    this.platforms[this.mainPlatform].x = this.coords.width;
    this.platforms[this.mainPlatform].alpha = 1;
    this.mainPlatform = 1 - this.mainPlatform;
    this.tweenPlatform();
    this.pole.angle = 0;
    this.pole.alpha = 1;
    this.pole.x =
      this.platforms[this.mainPlatform].getBounds().right - this.poleWidth;
    this.pole.displayHeight = this.poleWidth;

    this.gameMode = WAITING_START;
  }

  showWin() {
    this.scene.pause("game");
    this.scene.launch("win", this.points);
  }

  showGameOver() {
    const score = this.points.score;
    this.points = {
      ...this.points,
      score: 0,
      streak: 0,
    };
    setStoredScore(this.points);
    this.scene.start("game-over", { score });
  }

  handlePointerUp() {
    if (this.gameMode === WAITING_STOP) {
      this.gameMode = IDLE;

      this.growTween.stop();

      this.tweens.add({
        targets: [this.pole],
        angle: 90,
        duration: this.poleRotateTime,
        ease: "Bounce.easeOut",
        callbackScope: this,
        onComplete: function () {
          const poleBounds = this.pole.getBounds();
          const platformBounds =
            this.platforms[1 - this.mainPlatform].getBounds();

          let poleStatus = SUCCESS;
          if (poleBounds.right < platformBounds.left) {
            poleStatus = TOO_SHORT;
          } else {
            if (poleBounds.right > platformBounds.right) {
              poleStatus = TOO_LONG;
            }
          }
          this.moveHero(poleStatus);
        },
      });
    }
  }

  addGameInfo() {
    const { centerX, centerY } = this.coords;
    const content = `HOLD YOUR FINGER ON THE SCREEN
    TO STRECHT OUT THE STICK
    AND REACH NEXT PLATFORM`;
    this.info = this.add
      .text(centerX, centerY * 0.5, content, {
        fontSize: "22px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);
    this.gameMode = WAITING_START;
    this.firstMove = true;
  }

  showGameScore() {
    this.firstMove = false;
    const energyBar = this.add.sprite(
      this.coords.centerX,
      this.coords.height / 5,
      "energybar"
    );

    const energyBounds = energyBar.getBounds();
    this.scoreText = this.add
      .text(
        energyBounds.right,
        energyBounds.top - 40,
        `DISTANCE: ${this.mountains}`,
        {
          fontSize: "22px",
          color: "#FFFFFF",
        }
      )
      .setOrigin(1, 0);

    this.bestScoreText = this.add
      .text(
        energyBounds.left,
        energyBounds.bottom + 10,
        `MAX DISTANCE: ${this.points.best || 0}`,
        {
          fontSize: "22px",
          color: "#FFFFFF",
        }
      )
      .setOrigin(0, 0);

    this.energyStatus = this.add.sprite(
      energyBounds.left + 5,
      energyBounds.top + 5,
      "whitetile"
    );
    this.energyStatus.setOrigin(0, 0);
    this.energyStatus.displayWidth = 500;
    this.energyStatus.displayHeight = energyBounds.height - 10;
  }

  addGameTimer() {
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.timeLeft--;
        this.updateTimer();
      },
      callbackScope: this,
      loop: true,
    });
  }

  updateTimer() {
    this.energyStatus.displayWidth = (500 * this.timeLeft) / 30;
    if (this.timeLeft == 0) {
      this.tweens.killTweensOf(this.hero);
      this.tweens.killTweensOf(this.pole);

      this.fallAndDie();
    }
  }

  updateScore() {
    this.scoreText?.setText(`DISTANCE: ${this.mountains}`);
    this.points.score = this.mountains;
    if (this.mountains > this.points.best) {
      this.points.best = this.mountains;
      this.bestScoreText?.setText(`MAX DISTANCE: ${this.points.best}`);
    }

    if (this.points.streak % 3 === 0) {
      this.showWin();
    }
    setStoredScore(this.points);
  }
}
