import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from '../../components/Modal/Modal';
import AddFood from '../../components/AddFood/AddFood';
import Meal from '../../components/Meal/Meal';
import { ScrollView } from 'react-native-gesture-handler';
import { storeData, getData } from '../../utils';
import { CommonActions } from '@react-navigation/native';
import { SettingsContext } from '../../App';

let mealIndex = 0;
const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todayMeals, setTodayMeals] = useState([]);

  useEffect(() => {
    const date = new Date();
    const key = `${date.getYear()}_${date.getMonth()}_${date.getDate()}`;
    getData(key).then((storedTodayMeals) => {
      if (storedTodayMeals) {
        setTodayMeals(storedTodayMeals);
      }
    });
  }, []);

  useEffect(() => {
    if (todayMeals.length) {
      const date = new Date();
      const key = `${date.getYear()}_${date.getMonth()}_${date.getDate()}`;
      storeData(key, todayMeals);
    }
  }, [todayMeals]);

  const openModal = (index) => {
    setModalVisible(true);
    mealIndex = index;
  };

  const addFood = (food) => {
    const todayMealsCopy = todayMeals.slice();
    todayMealsCopy[mealIndex]?.foods?.push(food);
    setTodayMeals(todayMealsCopy);
    setModalVisible(false);
  };

  const deleteMeal = (index) => {
    const todayMealsCopy = todayMeals.slice();
    todayMealsCopy.splice(index, 1);
    setTodayMeals(todayMealsCopy);
  };

  const renderMeals = () => {
    return todayMeals.map((meal, index) => {
      return (
        <Meal
          deleteMeal={deleteMeal}
          key={index}
          index={index}
          addFood={addFood}
          openModal={openModal}
          meal={meal}
          foods={meal.foods}
          setTodayMeals={setTodayMeals}
        />
      );
    });
  };

  const addNewMeal = () => {
    const date = new Date();
    const mealCreationDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    setTodayMeals([...todayMeals, { name: mealCreationDate, foods: [] }]);
  };

  const renderAddNewMeal = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={addNewMeal}
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: 'black',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTotalNutrients = () => {
    const nutrients = todayMeals.reduce(
      (sum, value) => {
        value.foods.forEach((food) => {
          sum.totalCarbs += food.nutrients.carbs;
          sum.totalProteins += food.nutrients.proteins;
          sum.totalFats += food.nutrients.fats;
          sum.totalCalories += food.nutrients.calories;
        });

        return sum;
      },
      { totalCarbs: 0, totalProteins: 0, totalFats: 0, totalCalories: 0 },
    );

    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          borderTopColor: 'black',
          borderTopWidth: 1,
        }}>
        <View style={{ width: '70%' }}>
          <Text>UKUPNO DANAS:</Text>
          <Text>{`hidrata ${nutrients.totalCarbs}g`}</Text>
          <Text>{`proteina ${nutrients.totalProteins}g`}</Text>
          <Text>{`masti ${nutrients.totalFats}g`}</Text>
          <Text>{`kalorija ${nutrients.totalCalories}`}</Text>
        </View>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignContent: 'center',
            borderWidth: 1,
            borderColor: 'black',
            borderTopWidth: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Menu',
                  params: {
                    user: 'jane',
                  },
                }),
              );
            }}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            <Text style={{ textAlign: 'center' }}>MENI</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const { settingsInformation } = useContext(SettingsContext);

  return (
    <View style={{ flex: 1 }}>
      <Text>{`${settingsInformation.carbsCoveragePerInsulinUnit}g UH na 1j insulina`}</Text>

      <ScrollView style={{ width: '100%', padding: 10 }}>
        {renderMeals()}
        {renderAddNewMeal()}
      </ScrollView>
      {renderTotalNutrients()}
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <AddFood setModalVisible={setModalVisible} addFood={addFood} />
      </Modal>
    </View>
  );
};

export default HomeScreen;
