import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';

export const RequireAuth = ({ children }) => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState.isAuthenticated) {
      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, authState]);

  if (!authState || !authState.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return children;
};

export const RequireAdmin = ({ children }) => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState.isAuthenticated) {
      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, authState]);

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <div>Loading...</div>;
  }

  const userGroups = authState.accessToken?.claims?.groups || [];
  const isAdmin = userGroups.includes('admin');

  console.log('RequireAdmin - Auth State:', authState);
  console.log('RequireAdmin - Access Token Claims:', authState.accessToken?.claims);
  console.log('RequireAdmin - Groups:', userGroups);
  console.log('RequireAdmin - Is Admin:', isAdmin);

  if (!isAdmin) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You do not have permission to access this resource. Admin role is required.</p>
          <hr />
          <p className="mb-0">Please contact your administrator if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return children;
};
