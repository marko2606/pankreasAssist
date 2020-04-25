import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';
import {Foods} from '../../containers/Home/constants';

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
          borderColor: 'blue',
          borderWidth: 1,
        }}>
        <Text>-</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'blue',
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
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            style={{width: 50, textAlign: 'center'}}
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
          borderColor: 'blue',
          borderWidth: 1,
        }}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddFood = ({setModalVisible, addFood}) => {
  const [foodList, setFoodList] = useState(Foods);
  const searchFood = (e) => {
    const searchResults = Foods.filter((food) => {
      return food.name.includes(e);
    });
    setFoodList(searchResults);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
      <TextInput
        onChangeText={searchFood}
        placeholder="trazi"
        style={{
          borderWidth: 1,
          borderColor: 'brown',
          width: '100%',
          height: 40,
          marginTop: 40,
        }}
      />

      <FlatList
        style={{width: '100%'}}
        data={foodList}
        renderItem={({item}) => <FoodItem addFood={addFood} item={item} />}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10}}
        onPress={() => {
          setModalVisible(false);
        }}>
        <Text>Zatvori</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddFood;
