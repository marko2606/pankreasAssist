import React, {useState, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from '../../components/Modal/Modal';
import AddFood from '../../components/AddFood/AddFood';
import Meal from '../../components/Meal/Meal';
import {ScrollView} from 'react-native-gesture-handler';

let mealIndex = 0;
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todayMeals, setTodayMeals] = useState([
    // {
    //   name: 'rucak',
    // TODO: maybe add totals here?!
    //   foods: [
    //     {
    //       name: 'Banana',
    //       nutrients: {
    //         carbs: 20,
    //         fats: 2,
    //         proteins: 30,
    //         calories: 200,
    //       },
    //     },
    //     {
    //       name: 'Banana 2',
    //       nutrients: {
    //         carbs: 22,
    //         fats: 2,
    //         proteins: 30,
    //         calories: 222,
    //       },
    //     },
    //   ],
    // },
  ]);

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

  const renderMeals = () => {
    return todayMeals.map((meal, index) => {
      return (
        <Meal
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
    const mealCreationDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    setTodayMeals([...todayMeals, {name: mealCreationDate, foods: []}]);
  };

  const renderAddNewMeal = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={addNewMeal}
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#fff',
            backgroundColor: 'orange',
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
      {totalCarbs: 0, totalProteins: 0, totalFats: 0, totalCalories: 0},
    );
    return (
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{width: '70%'}}>
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
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>MENI</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{width: '100%', padding: 10}}>
        {renderMeals(todayMeals)}
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
