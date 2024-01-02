export const getRandomInt = (min: number, max: number) => {
  if (min !== undefined && max !== undefined) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return Math.floor(Math.random() * 10);
  }
};
