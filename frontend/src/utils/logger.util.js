const isDev = import.meta.env.MODE === "development";

export const logger = {
  debug: (...args) => {
    if (isDev) console.debug("[DEBUG]", ...args);
  },

  info: (...args) => {
    if (isDev) console.info("[INFO]", ...args);
  },

  warn: (...args) => {
    console.warn("[WARN]", ...args);
  },

  error: (...args) => {
    console.error("[ERROR]", ...args);
  },
};
