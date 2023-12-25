export const parseCords = (cords: string) => {
  const [x, y, z] = cords.split(' ');

  return {
    x: +x,
    y: +y,
    z: +z,
  };
};
