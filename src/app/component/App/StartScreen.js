import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {backgroundColor, primaryColor} from '../../../utils';

const StartScreen = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Emotion Keeper</Text>
        <Text style={styles.txtDetail}>
          ( Record your emotion through out day )
        </Text>
      </View>

      <View style={styles.animation}>
        <LottieView
          source={require('../../../images/color.json')}
          autoPlay
          loop
        />
      </View>

      <TouchableOpacity
        style={styles.startButt}
        onPress={() => props.navigation.navigate('Home')}>
        <Text style={styles.txt}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: backgroundColor,
    justifyContent: 'space-around',
  },
  animation: {
    width: '100%',
    flex: 0.6,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primaryColor,
  },
  startButt: {
    marginTop: 15,
    backgroundColor: primaryColor,
    alignSelf: 'center',
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 35,
  },
  txt: {
    color: 'black',
  },
  txtDetail: {
    fontSize: 15,
    textAlign: 'center',
    color: primaryColor,
  },
});

export default StartScreen;
