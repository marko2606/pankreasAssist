import React from 'react';
import {TextInput, Text, View} from 'react-native';
const Input = ({label, ...props}) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <Text>{label}</Text>
      <TextInput
        {...props}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          width: '100%',
          height: 40,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default Input;
