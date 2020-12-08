import React, {useState, useEffect} from 'react';
import {getData, storeData} from '../../../utils';
import {keys} from '../../../constants';

const useFoods = () => {
  const [foods, setFoods] = useState([]);

  const addNewFoodToStorage = (newFood) => {
    storeData(keys.storedFoods, [...foods, newFood]).then(() => {
      getData(keys.storedFoods).then((res) => {
        setFoods(res);
        console.log('addNewFoodToStorage -> res', res);
      });
    });
  };
  useEffect(() => {
    getData(keys.storedFoods).then((res) => {
      setFoods(res);
    });
  }, []);

  return [foods, addNewFoodToStorage];
};

export default useFoods;
