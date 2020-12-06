const data = [
  { id: 1, boundaries: { x: 400, y: 500, x2: 900, y2: 750 } },
  { id: 2, boundaries: { x: 100, y: 300, x2: 200, y2: 350 } },
];

export const getSelectedRectangle = cursor => {
  const elem = data.find(
    ({ boundaries: { x, y, x2, y2 } }) =>
      cursor.x >= x && cursor.x <= x2 && cursor.y >= y && cursor.y <= y2,
  );
  return elem ? elem.id : -1;
};
