import * as React from 'react';
import { Provider } from 'react-redux';
import createStore from './shared/reducers';
import * as SplashScreen from 'expo-splash-screen';
import SocialNetworkConfig from './SocialNetworkConfig';

import NavContainer from './navigation/nav-container';
import * as FacebookAds from 'expo-ads-facebook';

const store = createStore();

if (SocialNetworkConfig.adsConfig) {
  FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);
  FacebookAds.AdSettings.setLogLevel('debug');
}

export default function AppJH() {
  // prevent the splashscreen from disappearing until the redux store is completely ready (hidden in nav-container.js)
  const [displayApp, setDisplayApp] = React.useState(false);
  React.useEffect(() => {
    if (!displayApp) {
      SplashScreen.preventAutoHideAsync()
        .then(() => setDisplayApp(true))
        .catch(() => setDisplayApp(true));
    }
  }, [displayApp, setDisplayApp]);

  return displayApp ? (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  ) : null;
}
