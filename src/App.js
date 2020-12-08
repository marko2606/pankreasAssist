import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Router from './Router';
import {storeData, getData} from './utils';
import {keys} from './constants';
import {Foods} from './containers/Home/constants';

//console.disableYellowBox = true;

export const SettingsContext = React.createContext({
  carbsCoveragePerInsulinUnit: 6.5,
});

const useSettingsInformation = () => {
  const [settingsInformation, setSettingsInformation] = useState({
    carbsCoveragePerInsulinUnit: 6.5,
  });

  const storeDataToPhoneMemory = (newData) => {
    storeData(keys.carbsCoveragePerInsulinUnit, newData)
      .then(() => {
        setSettingsInformation(newData);
      })
      .catch((e) => {
        console.log('storeDataToPhoneMemory -> e', e);

        alert('n]puce');
      });
  };
  return [settingsInformation, storeDataToPhoneMemory];
};

const App = () => {
  const [
    settingsInformation,
    setSettingsInformation,
  ] = useSettingsInformation();
  console.log('App -> settingsInformation', settingsInformation);
  //storeData(keys.carbsCoveragePerInsulinUnit, 5);
  useEffect(() => {
    getData(keys.isFirstTimeOpeningPancreasAssist).then((res) => {
      if (!res) {
        storeData(keys.isFirstTimeOpeningPancreasAssist, 'true');
        storeData(keys.storedFoods, Foods);
      }
    });

    getData(keys.carbsCoveragePerInsulinUnit).then((res) => {
      setSettingsInformation({
        ...settingsInformation,
        carbsCoveragePerInsulinUnit: res.carbsCoveragePerInsulinUnit || 10, // TODO: move default value or disable using app if not set
      });
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <SettingsContext.Provider
        value={{settingsInformation, setSettingsInformation}}>
        <Router />
      </SettingsContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
