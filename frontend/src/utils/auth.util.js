/**
 * Registered logout function (injected from app layer)
 */
let logoutHandler = null;

/**
 * Guards to prevent duplicate or repeated logout execution
 */
let isLoggingOut = false;
let hasLoggedOut = false;

/**
 * Register logout handler (e.g., from React app)
 */
export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

/**
 * Triggers logout safely (used in global error handlers like interceptors)
 */
export const triggerLogout = () => {
  if (logoutHandler && !isLoggingOut && !hasLoggedOut) {
    isLoggingOut = true;
    hasLoggedOut = true;

    Promise.resolve(logoutHandler()).finally(() => {
      isLoggingOut = false;
    });
  }
};
