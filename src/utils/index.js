import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    alert(e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    alert(e);
  }
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    alert(e);
  }
};

export const getMultiple = async (keys) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
    values = values.reduce((accumulator, currentValue) => {
      currentValue = JSON.parse(currentValue[1]);
      accumulator.push(currentValue[0]);
      return accumulator;
    }, []);
    return values;
  } catch (e) {
    alert(e);
  }
};
