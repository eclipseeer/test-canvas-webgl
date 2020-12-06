export const getMouseCoords = (event, canvas) => {
  const boundaries = canvas.getBoundingClientRect();
  return {
    x: Math.abs(Math.round(event.clientX - boundaries.x)),
    y: Math.abs(Math.round(event.clientY - boundaries.y)),
  };
};
