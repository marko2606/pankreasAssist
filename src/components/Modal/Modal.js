import React from 'react';
import {
  View,
  Modal as NativeModal,
  TouchableHighlight,
  Text,
  TextInput,
} from 'react-native';
const Modal = ({modalVisible, setModalVisible, children}) => {
  return (
    <NativeModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}>
      {children}
    </NativeModal>
  );
};

export default Modal;
