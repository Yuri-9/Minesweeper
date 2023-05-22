export const getThreeCharacters = (number: number) => {
  const currentMins = '000' + number;
  return currentMins.substring(currentMins.length - 3);
};
