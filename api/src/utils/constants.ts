// Default application port
export const APP_PORT = 3000;

// JWT Token Duration
export const JWT_TOKEN_DURATION = '1d';
export const PASSWORD_MIN_LENGTH = 10;

// Headers
// Authorization header is like this:
// Authorization: Bearer some-jwt-here
export const AUTHORIZATION_HEADER = 'Authorization';

// Success codes
export const HTTP_CREATED = 201;
export const HTTP_OK = 200;
export const HTTP_NO_CONTENT = 204;

// Client error codes
export const HTTP_NOT_AUTHENTICATED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_CONFLICT_ERROR = 409;
export const HTTP_UNPROCESSABLE_ENTITY = 422;

// Server error codes
export const HTTP_SERVER_ERROR = 500;
