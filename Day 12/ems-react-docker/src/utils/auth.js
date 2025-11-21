export const hasAdminRole = (authState) => {
  return authState?.isAuthenticated && 
    (authState.accessToken?.claims?.groups || []).includes('admin');
};

export const isAuthenticated = (authState) => authState?.isAuthenticated || false;

export const getAccessToken = (authState) => authState?.accessToken?.accessToken;

export const getUserInfo = (authState) => 
  authState?.isAuthenticated && authState.idToken ? {
    name: authState.idToken.claims.name,
    email: authState.idToken.claims.email,
    groups: authState.accessToken?.claims.groups || [],
  } : null;
