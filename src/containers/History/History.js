import React, {useState, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {View, Button, ScrollView} from 'react-native';
import {getAllKeys, getMultiple} from '../../utils';
import Meal from '../../components/Meal/Meal';
import {keys} from '../../constants/index';

const History = ({navigation}) => {
  const [historyMeals, setHistoryMeals] = useState([]);
  useEffect(() => {
    getAllKeys().then((allStoredKeys) => {
      const nonDateKeys = Object.keys(keys);
      const dateKeys = allStoredKeys.filter((storedKey) => {
        const isDateKey = !nonDateKeys.includes(storedKey);
        return isDateKey;
      });
      getMultiple(dateKeys).then((storedHistoryMeals) => {
        setHistoryMeals(storedHistoryMeals);
      });
    });
  }, []);
  const renderHistoryMeals = () => {
    return historyMeals.map((meal, index) => {
      return (
        <Meal
          deleteMeal={() => null}
          key={index}
          index={index}
          addFood={() => null}
          openModal={() => null}
          meal={meal}
          foods={meal.foods}
          setTodayMeals={() => null}
        />
      );
    });
  };

  return (
    <View>
      <ScrollView>{renderHistoryMeals()}</ScrollView>

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

export default History;
