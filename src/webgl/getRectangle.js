export const getRectangle = (x, y, width, height) => {
  const x2 = x + width;
  const y2 = y + height;
  // prettier-ignore
  return [
    x, y,
    x, y2,
    x2, y2,
    x2, y2,
    x2, y,
    x, y,
  ];
};
