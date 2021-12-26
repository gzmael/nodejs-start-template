export default {
  jwt: {
    secret_token:
      process.env.SECRET_TOKEN || 'secret_token_for_auth_module_development',
    expires_in_token: process.env.EXPIRE_TOKEN || '15min',
    secret_refresh_token:
      process.env.REFRESH_TOKEN || 'secret_refresh_token_default',
    expires_in_refresh_token: process.env.EXPIRE_REFRESH_TOKEN || '30d',
    expires_refresh_token_days: process.env.REFRESH_TOKEN_DAYS || 30,
  },
};
