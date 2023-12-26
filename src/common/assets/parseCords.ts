import { CordsType } from '../types';

export const parseCords = (cords: string): CordsType => {
  const [x, y, z] = cords.split(' ');

  return {
    x: +x,
    y: +y,
    z: +z,
  };
};
