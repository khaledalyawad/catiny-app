import React, {useEffect, useState} from 'react';
import {Button, StatusBar, Text, YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import SplashScreen from 'react-native-splash-screen';
import * as JHSplashScreen from 'expo-splash-screen';
import {MenuProvider} from 'react-native-popup-menu';
import configureStore from './shared/reducers';
import AppContainer from './screens/AppContainer';
import {setI18nConfig} from './Core/localization/IMLocalization';
import * as FacebookAds from 'expo-ads-facebook';
import SocialNetworkConfig from './SocialNetworkConfig';
import {enableScreens} from 'react-native-screens';
import NavContainer from './navigation/nav-container';

if (SocialNetworkConfig.adsConfig)
{
  FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);
  FacebookAds.AdSettings.setLogLevel('debug');
}

const MainNavigator = AppContainer;

const store = configureStore();
const handleLocalizationChange = () =>
{
  setI18nConfig();
};

const App = (props) =>
{
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  enableScreens();

  useEffect(() =>
  {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Remote Debugger']);
    console.disableYellowBox = true;
    setI18nConfig();
    Appearance.addChangeListener(({colorScheme}) =>
    {
      setColorScheme(colorScheme);
    });
  }, []);

  const [displayApp, setDisplayApp] = React.useState(false);
  React.useEffect(() =>
  {
    if (!displayApp)
    {
      JHSplashScreen.preventAutoHideAsync()
        .then(() => setDisplayApp(true))
        .catch(() => setDisplayApp(true));
    }
  }, [displayApp, setDisplayApp]);
  const [jhipsterIsOpen, setJhipsterIsOpen] = useState(false);

  return (
    <Provider store={store}>
      <Button title={'open jhipster'} onPress={() => setJhipsterIsOpen((prev) => !prev)}>
        <Text></Text>
      </Button>
      {jhipsterIsOpen && displayApp && <NavContainer />}
      {!jhipsterIsOpen && (
        <AppearanceProvider>
          <MenuProvider>
            <StatusBar />
            <MainNavigator screenProps={{theme: colorScheme}} />
          </MenuProvider>
        </AppearanceProvider>
      )}
    </Provider>
  );
};

export default App;
