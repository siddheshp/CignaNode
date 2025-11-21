// Helper function to get config value from runtime or build-time
const getEnvValue = (key) => {
  // First try runtime config (for Docker/Podman)
  if (window.ENV_CONFIG && window.ENV_CONFIG[key] && !window.ENV_CONFIG[key].startsWith('${')) {
    return window.ENV_CONFIG[key];
  }
  // Fallback to build-time env (for local development)
  return import.meta.env[key];
};

export const oktaConfig = {
  issuer: `${getEnvValue('VITE_OKTA_DOMAIN')}/oauth2/default`,
  clientId: getEnvValue('VITE_OKTA_CLIENT_ID'),
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: getEnvValue('VITE_OKTA_DISABLE_HTTPS_CHECK') === 'true',
};
