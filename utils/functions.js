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

export { getCoords, getGameName, getStoredScore, setStoredScore };
