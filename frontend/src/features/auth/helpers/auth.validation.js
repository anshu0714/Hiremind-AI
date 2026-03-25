export const validateEmail = (email) => {
  if (!email) return "Email is required";

  const trimmed = email.trim();

  if (!trimmed.includes("@")) {
    return "Please enter a valid email";
  }

  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.trim().length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

export const validateUsername = (username) => {
  if (!username) return "Username is required";

  if (username.trim().length < 3) {
    return "Username must be at least 3 characters";
  }

  return null;
};
