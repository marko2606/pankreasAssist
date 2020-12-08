import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './containers/Home/Home';
import Menu from './containers/Menu/Menu';
import NewFood from './containers/NewFood/NewFood';
import {View} from 'native-base';
import History from './containers/History/History';
import Settings from './containers/Settings/Settings';

const Stack = createStackNavigator();

function Router() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NewFood"
            component={NewFood}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Router;
