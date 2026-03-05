/**
 * Logs HTTP requests and responses.
 * Masks sensitive fields like password and token.
 */
function logger(req, res, next) {
  console.log("\n========== API REQUEST ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);

  const body = { ...req.body };

  if (body.password) body.password = "******";
  if (body.token) body.token = "******";

  console.log("Body:", body);

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    console.log("Response:", data);
    return originalJson(data);
  };

  next();
}

module.exports = logger;
