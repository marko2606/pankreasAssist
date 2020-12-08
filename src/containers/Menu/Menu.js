import React, {PureComponent} from 'react';
import {CommonActions} from '@react-navigation/native';
import {View, Button} from 'react-native';

const Navigation = ({navigation}) => {
  return (
    <View
      style={{backgroundColor: 'white', flex: 1, padding: 10, paddingTop: 40}}>
      <Button
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'History',
            }),
          );
        }}
        title="Istorija"
        color="#841584"
      />
      <Button onPress={() => null} title="Dodaj novi obrok" color="#841584" />
      <Button
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'NewFood',
            }),
          );
        }}
        title="Dodaj novu hranu"
        color="#841584"
      />
      <Button
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Settings',
            }),
          );
        }}
        title="Podesavanje profila"
        color="#841584"
      />
      <Button
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Home',
            }),
          );
        }}
        title="Vrati se"
        color="#841584"
      />
    </View>
  );
};

export default Navigation;
