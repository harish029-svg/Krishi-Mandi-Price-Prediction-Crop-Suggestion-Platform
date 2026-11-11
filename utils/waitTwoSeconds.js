export const waitTwoSeconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved after 2 seconds!");
    }, 2000);
  });
};
