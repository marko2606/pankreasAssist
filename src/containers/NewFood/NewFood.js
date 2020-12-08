import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/Input/Input';
import useFoods from '../../components/hooks/useFoods/useFoods';

const NewFood = ({navigation}) => {
  const [, setFoodToStorage] = useFoods();
  const [newFood, setNewFood] = useState({
    name: '',
    proteins: null,
    carbs: null,
    fats: null,
    calories: null,
    quantity: null,
  });
  const handleChange = (key, value) => {
    setNewFood({...newFood, [key]: value});
  };

  const addNewFoodToStorage = () => {
    setFoodToStorage({
      name: newFood.name,
      quantity: Number(newFood.quantity),
      unit: 'g',
      nutrients: {
        proteins: Number(newFood.proteins),
        carbs: Number(newFood.carbs),
        fats: Number(newFood.fats),
        calories: Number(newFood.calories),
      },
    });
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      }),
    );
  };
  return (
    <KeyboardAwareScrollView>
      <Text style={{margin: 20, fontSize: 22, textAlign: 'center'}}>
        DODAJ HRANU
      </Text>
      <Input
        label="Naziv hrane"
        value={newFood.name}
        onChangeText={(e) => handleChange('name', e)}
        placeholder="Trazi hranu"
      />
      <Input
        label="Vrednost hidrata"
        value={newFood.carbs}
        onChangeText={(e) => handleChange('carbs', e)}
        placeholder=""
        keyboardType="numeric"
      />
      <Input
        label="Vrednost proteina"
        value={newFood.proteins}
        onChangeText={(e) => handleChange('proteins', e)}
        placeholder=""
        keyboardType="numeric"
      />
      <Input
        label="Vrednost Masti"
        value={newFood.fats}
        onChangeText={(e) => handleChange('fats', e)}
        placeholder=""
        keyboardType="numeric"
      />
      <Input
        label="Ukupno kalorija"
        value={newFood.calories}
        onChangeText={(e) => handleChange('calories', e)}
        placeholder=""
        keyboardType="numeric"
      />
      <Input
        label="Kolicina u gramima"
        value={newFood.quantity}
        onChangeText={(e) => handleChange('quantity', e)}
        placeholder=""
        keyboardType="numeric"
      />
      <Button onPress={addNewFoodToStorage} title="Dodaj" color="#841584" />
      <Button
        style={{marginTop: 10}}
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Home',
            }),
          );
        }}
        title="Otkazi"
        color="#841584"
      />
    </KeyboardAwareScrollView>
  );
};

export default NewFood;
