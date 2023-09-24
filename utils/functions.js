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

export { getCoords, getGameName };
