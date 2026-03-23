export const log = (...args) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

export const logError = (...args) => {
  if (import.meta.env.DEV) {
    console.error(...args);
  }
};