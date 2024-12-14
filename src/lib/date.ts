export const getNextYearAsDate = () => {
  const date = new Date();
  const expiresIn = date.setFullYear(date.getFullYear() + 1);
  return new Date(expiresIn);
};
