export const randomId = () => {
  return (Date.now().toString(16) + Math.random(16).toString()).replace(
    /\./g,
    "",
  );
};
