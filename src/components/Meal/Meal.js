import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Meal = ({meal: {foods}, meal, openModal, index}) => {
  let nutrients = {
    totalCarbs: 0,
    totalProteins: 0,
    totalFats: 0,
    totalCalories: 0,
    totalQuantity: 0,
  };
  foods.forEach((value) => {
    nutrients.totalCarbs += value.nutrients.carbs;
    nutrients.totalProteins += value.nutrients.proteins;
    nutrients.totalFats += value.nutrients.fats;
    nutrients.totalCalories += value.nutrients.calories;
    nutrients.totalQuantity += value.quantity;
  });

  const renderRows = () => {
    return meal?.foods.map((ingredient, index) => (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {ingredient.name}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {ingredient.nutrients.carbs}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {ingredient.nutrients.proteins}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {ingredient.nutrients.fats}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {ingredient.nutrients.calories}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {ingredient.quantity + ingredient.unit}
        </Text>
      </View>
    ));
  };

  const renderHeaderRow = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
          }}
        />

        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          UH
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          P
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          M
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          CAL
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          Kolicina
        </Text>
      </View>
    );
  };

  const renderTotalRow = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          Ukupno
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {nutrients.totalCarbs}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {nutrients.totalProteins}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {nutrients.totalFats}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {nutrients.totalCalories}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 1,
            textAlign: 'center',
          }}>
          {nutrients.totalQuantity + 'g'}
        </Text>
      </View>
    );
  };
  const renderTable = () => {
    return (
      <View>
        {renderHeaderRow()}
        {renderRows()}
        {renderTotalRow()}
      </View>
    );
  };

  const unitsOfInsulin = nutrients.totalCarbs / 7.5;
  return (
    <View style={{backgroundColor: 'gray', marginVertical: 10}}>
      <Text style={{alignSelf: 'center'}}>{meal.name}</Text>
      {renderTable()}
      <Text
        style={{
          marginVertical: 10,
        }}>{`Jedinica insulina za obrok: ${unitsOfInsulin}`}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={() => openModal(index)}>
          <Text>+ hrana</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>+ obrok</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>+ rucno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Meal;
