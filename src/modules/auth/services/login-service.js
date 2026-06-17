const User = require('../../../schema/user.model');
const jwtUtils = require('../../../lib/jwt');
const passwordUtils = require('../../../utils/password');
const authLogger = require('../auth-logger');
const { UnauthorizedError, ForbiddenError } = require('../../../utils/custom-error');

const login = async (email, password) => {
  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    authLogger.warn(`Failed login attempt for email: ${email}`);
    throw new UnauthorizedError('Invalid credentials');
  }

  // Check if user is active
  if (user.status !== 'active') {
    authLogger.warn(`Login attempt for inactive account: ${email}`);
    throw new ForbiddenError('Account is inactive');
  }

  // Compare password using password utils
  const isPasswordValid = await passwordUtils.comparePassword(password, user.password);
  if (!isPasswordValid) {
    authLogger.warn(`Failed login attempt with invalid password for: ${email}`);
    throw new UnauthorizedError('Invalid credentials');
  }

  authLogger.info(`User logged in: ${email}`);

  // Generate tokens
  const payload = { id: user._id, email: user.email };
  const { accessToken, refreshToken } = jwtUtils.generateTokens(payload);

  // Save refresh token to database
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
    },
    accessToken,
    refreshToken,
  };
};

module.exports = { login };
