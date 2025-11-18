export const oktaConfig = {
  issuer: `${import.meta.env.VITE_OKTA_DOMAIN}/oauth2/default`,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: import.meta.env.VITE_OKTA_DISABLE_HTTPS_CHECK === 'true',
};
