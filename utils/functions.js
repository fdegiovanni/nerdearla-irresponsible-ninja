const getCoords = (scene) => {
  const {
    width,
    height,
    centerX = width * 0.5,
    centerY = height * 0.5,
  } = scene.sys.game.config;

  return { width, height, centerX, centerY };
};

const getGameName = (scene) => {
  return scene.sys.game.config.gameTitle || "";
};

const keyStore = "irresponsible";

const getStoredScore = () => {
  const storedScore = localStorage.getItem(keyStore);
  return storedScore
    ? JSON.parse(storedScore)
    : { score: 0, streak: 0, best: 0 };
};

const setStoredScore = (score) => {
  localStorage.setItem(keyStore, JSON.stringify(score));
};

const addSounds = (scene) => {
  scene.sounds = {
    death: scene.sound.add("death"),
    run: scene.sound.add("run"),
    stick: scene.sound.add("stick"),
    grow: scene.sound.add("grow"),
    pick: scene.sound.add("pick"),
    click: scene.sound.add("click"),
  };
};

const playSound = (sound, options) => {
  if (window.soundOn) {
    sound.play("", options);
  }
};

const stopSound = (sound) => {
  sound.stop();
};

export {
  getCoords,
  getGameName,
  getStoredScore,
  setStoredScore,
  addSounds,
  playSound,
  stopSound,
};
