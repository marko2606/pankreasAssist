import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {SettingsContext} from '../../App';
import Input from '../../components/Input/Input';
import {CommonActions} from '@react-navigation/native';

const Settings = ({navigation}) => {
  const {settingsInformation, setSettingsInformation} = useContext(
    SettingsContext,
  );
  console.log('Settings -> settingsInformation', settingsInformation);

  const handleChange = (key, value) => {
    setSettingsInformation({...settingsInformation, [key]: value});
  };
  return (
    <View>
      <Text>SETTINGS</Text>
      <Input
        label="Koliko 1 jedinica insulina pokriva hidrata"
        value={settingsInformation.carbsCoveragePerInsulinUnit}
        onChangeText={(e) => handleChange('carbsCoveragePerInsulinUnit', e)}
        placeholder={settingsInformation.carbsCoveragePerInsulinUnit + ''}
      />
      <Button
        title="Vrati se"
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Home',
            }),
          );
        }}
      />
    </View>
  );
};

export default Settings;
