import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Router from 'next/router';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  // const history = createBrowserHistory();
  // const onRedirectCallback = (appState?: AppState) => {
  //   history.push(appState?.returnTo || window.location.pathname);
  // };
  const onRedirectCallback = (appState?: AppState) => {
    // Use Next.js's Router.replace method to replace the url
    Router.replace(appState?.returnTo || '/');
  };

  return (
  <Auth0Provider
    domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"] || ""}
    clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"] || ""}
    authorizationParams={{
      redirect_uri:
        typeof window !== 'undefined' ? window.location.origin : undefined,
    }}
    onRedirectCallback={onRedirectCallback}
  >
    <div className={inter.className}>
      <Toaster />
      <Component {...pageProps} />
    </div>
  </Auth0Provider>
  );
}

export default appWithTranslation(App);
