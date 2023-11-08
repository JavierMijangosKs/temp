export const getAverage = (ratings = []) => {
  if (ratings.length) {
    const average =
      ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;
    return Math.round(average);
  }

  return 0;
};
