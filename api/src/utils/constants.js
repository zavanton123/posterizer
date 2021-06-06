// Default application port
exports.APP_PORT = 3000;

// JWT Token Duration
exports.JWT_TOKEN_DURATION = '1d'
exports.PASSWORD_MIN_LENGTH = 10;

// Headers
// Authorization header is like this:
// Authorization: Bearer some-jwt-here
exports.AUTHORIZATION_HEADER ='Authorization';

// Success codes
exports.HTTP_CREATED = 201;
exports.HTTP_OK = 200;
exports.HTTP_NO_CONTENT = 204;

// Client error codes
exports.HTTP_NOT_AUTHENTICATED = 401;
exports.HTTP_FORBIDDEN = 403;
exports.HTTP_NOT_FOUND = 404;
exports.HTTP_CONFLICT_ERROR = 409;
exports.HTTP_UNPROCESSABLE_ENTITY = 422;

// Server error codes
exports.HTTP_SERVER_ERROR = 500;
