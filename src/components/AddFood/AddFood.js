import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';
import {getData} from '../../utils';
import {keys} from '../../constants';
import useFoods from '../hooks/useFoods/useFoods';
//import {Foods} from '../../containers/Home/constants';

const FoodItem = ({item, addFood}) => {
  const [food, setFood] = useState(item);

  const decreaseQuantity = () =>
    setFood({
      ...food,
      nutrients: {
        carbs: food.nutrients.carbs * ((food.quantity - 50) / food.quantity),
        fats: food.nutrients.fats * ((food.quantity - 50) / food.quantity),
        proteins:
          food.nutrients.proteins * ((food.quantity - 50) / food.quantity),
        calories:
          food.nutrients.calories * ((food.quantity - 50) / food.quantity),
      },
      quantity: food.quantity - 50,
    });
  const increaseQuantity = () =>
    setFood({
      ...food,
      nutrients: {
        carbs: food.nutrients.carbs * ((food.quantity + 50) / food.quantity),
        fats: food.nutrients.fats * ((food.quantity + 50) / food.quantity),
        proteins:
          food.nutrients.proteins * ((food.quantity + 50) / food.quantity),
        calories:
          food.nutrients.calories * ((food.quantity + 50) / food.quantity),
      },
      quantity: food.quantity + 50,
    });
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={decreaseQuantity}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 1,
        }}>
        <Text>-</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 1,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            addFood(food);
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <TextInput
            onChangeText={(e) =>
              setFood({
                ...food,
                nutrients: {
                  carbs: food.nutrients.carbs * (e / food.quantity),
                  fats: food.nutrients.fats * (e / food.quantity),
                  proteins: food.nutrients.proteins * (e / food.quantity),
                  calories: food.nutrients.calories * (e / food.quantity),
                },
                quantity: Number(e),
              })
            }
            keyboardType="numeric"
            placeholder="trazi"
            value={food.quantity.toString()}
            style={{textAlign: 'center'}}
            selectTextOnFocus
          />
          <Text>g</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={increaseQuantity}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 1,
        }}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddFood = ({setModalVisible, addFood}) => {
  const [foods] = useFoods();
  console.log('AddFood -> foods', foods);
  useEffect(() => {
    setFoodList(foods);
  }, [foods]);

  const [foodList, setFoodList] = useState(foods);

  const searchFood = (e) => {
    const searchResults = foods.filter((food) => {
      return food.name.toLowerCase().includes(e.toLowerCase());
    });
    setFoodList(searchResults);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
      <TextInput
        onChangeText={searchFood}
        placeholder="Trazi hranu"
        style={{
          borderWidth: 1,
          borderColor: 'black',
          width: '100%',
          height: 40,
          marginTop: 40,
          textAlign: 'center',
        }}
      />

      <FlatList
        style={{width: '100%'}}
        data={foodList}
        renderItem={({item}) => <FoodItem addFood={addFood} item={item} />}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity
        style={{backgroundColor: 'black', padding: 10}}
        onPress={() => {
          setModalVisible(false);
        }}>
        <Text style={{color: 'white'}}>Zatvori</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddFood;
