/**
 * Send a standardized success response
 * @param {Object} data - Optional data to return
 * @param {Number} statusCode - HTTP status code (default 200)
 */
function sendSuccess(res, message, data = null, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

module.exports = { sendSuccess };
