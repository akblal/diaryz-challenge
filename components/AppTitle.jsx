import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AppTitle = () => {

  return (
    <View style= {styles.title}>
      <Text style= {styles.appTitle}>
        reminder
    </Text>
    </View>
  )
}

export default AppTitle

const styles = StyleSheet.create({

  title: {
    flex: 2,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appTitle: {
    fontSize: 80,
  },
})