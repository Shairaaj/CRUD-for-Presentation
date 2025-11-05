/**
 * Middleware to verify the user from client-sent info.
 *
 * The client should send either:
 * - headers: x-user-id and x-user-role
 * OR
 * - body: user: { id, role }
 *
 * This middleware fetches the user from DB by id and attaches the full DB user
 * as req.authorizedUser for controllers to check role, id, etc.
 *
 * Important: never trust role sent from client; always verify from DB.
 */

const userService = require("../services/userService");

module.exports = async function verifyUser(req, res, next) {
  try {
    const headerId = req.header("x-user-id");
    // headerRole ignored for trust; we still read it optionally for convenience but always verify DB
    const bodyUser = req.body && req.body.user;
    const id = headerId || (bodyUser && bodyUser.id);

    if (!id) {
      // Not authenticated
      req.authorizedUser = null;
      return next();
    }

    const user = await userService.findById(id);
    if (!user) {
      req.authorizedUser = null;
      return next();
    }

    // attach DB user
    req.authorizedUser = user;
    return next();
  } catch (err) {
    console.error("verifyUser error", err);
    req.authorizedUser = null;
    return next();
  }
};
