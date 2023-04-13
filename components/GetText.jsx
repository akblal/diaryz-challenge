import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';

const GetText = ({ date, time, text, saveReminder, handleChangeText}) => {

  return (
    <View>
      <View style= {styles.centerContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            style= {styles.input}
            onChangeText = {handleChangeText}
            value= {text}
            placeholder= 'what are you going to forget?'
          />
        </TouchableWithoutFeedback>
      </View>

      <View style= {styles.centerContainer}>
        <TouchableOpacity onPress= {saveReminder} style= {(!date || !time || !text) ? styles.buttonDisabled : styles.button} disabled= {!date || !time || !text}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetText

const styles = StyleSheet.create({

  centerContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },

  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 240,
  },

  buttonDisabled: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    opacity: 0.5
  },

  button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },

})