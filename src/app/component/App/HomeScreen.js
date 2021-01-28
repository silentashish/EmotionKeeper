import React from 'react';
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../style/styleSheet';

export const Header = () => {
  return (
    <View
      style={{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        width: '100%',
        paddingVertical: 35,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 32, color: 'white'}}>
        Emotion Keeper
      </Text>
    </View>
  );
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      status: false,
      firstName: '',
      uid: '',
      emotion: null,
      allData: [],
    };
  }
  storeData = async (value, callback) => {
    try {
      await AsyncStorage.setItem(
        '@storage_Key',
        JSON.stringify([...this.state.allData, value]),
      );
      callback();
    } catch (e) {
      // saving error
      alert('Some Error occur');
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        this.setState({allData: JSON.parse(value)});
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
  }

  handleEmoPress(targetRef) {
    // targetRef is emoticon ref, so I can call setNativeProps to change size:
    // loop through all emoticons, if it is targetRef, increase size
    // if not, reduce size back to normal
    Object.keys(this.refs).forEach((ref) => {
      if (ref === targetRef) {
        this.refs[ref].setNativeProps({style: {width: 60, height: 60}});
      } else {
        this.refs[ref].setNativeProps({style: {width: 40, height: 40}});
      }
    });
    this.setState({emotion: parseInt(targetRef)});
  }

  renderStatus() {
    return (
      <View style={styles.statusContainer}>
        <TextInput
          style={styles.statusInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Tell us about your day..."
          placeholderTextColor="#5D737E"
        />
        <TouchableOpacity
          onPress={() => this.saveToDiary()}
          style={styles.button}>
          <Text style={{color: '#5D737E'}}>Save to Diary</Text>
        </TouchableOpacity>
      </View>
    );
  }

  saveToDiary() {
    if (this.state.emotion === null) {
      alert('Select Emotion first');
      return;
    }
    const time = moment().unix(); // current time in unix number

    this.storeData(
      {
        time,
        emotion: this.state.emotion,
        text: this.state.text,
      },
      () => {
        this.setState({text: '', emotion: null});
        this.props.navigation.navigate('User');
        Object.keys(this.refs).forEach((ref) => {
          this.refs[ref].setNativeProps({style: {width: 40, height: 40}});
        });
      },
    );
    // firebase.database().ref(`/emotions/${this.state.uid}/${time}`)
    //   .set({
    //     time,
    //     emotion: this.state.emotion,
    //     text: this.state.text
    //   });
  }

  render() {
    const assetPath = '../../../images/assets';
    return (
      <LinearGradient colors={['#28313B', '#485461']} style={styles.container}>
        <Header />
        <KeyboardAwareScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.prompt2}>How are you feeling now?</Text>

          <View style={styles.emoContainer}>
            <TouchableOpacity onPress={() => this.handleEmoPress('-2')}>
              <Image
                source={require(`${assetPath}/icons8-crying.png`)}
                ref="-2"
                style={styles.emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleEmoPress('-1')}>
              <Image
                source={require(`${assetPath}/icons8-sad.png`)}
                ref="-1"
                style={styles.emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleEmoPress('0')}>
              <Image
                source={require(`${assetPath}/icons8-neutral_emoticon.png`)}
                ref="0"
                style={styles.emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleEmoPress('1')}>
              <Image
                source={require(`${assetPath}/icons8-happy.png`)}
                ref="1"
                style={styles.emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleEmoPress('2')}>
              <Image
                source={require(`${assetPath}/icons8-lol.png`)}
                ref="2"
                style={styles.emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleEmoPress('3')}>
              <Image
                source={require(`${assetPath}/icons8-smiling_face_with_heart.png`)}
                ref="3"
                style={styles.emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleEmoPress('4')}>
              <Image
                source={require(`${assetPath}/icons8-in_love.png`)}
                ref="4"
                style={styles.emoji}
              />
            </TouchableOpacity>
          </View>

          {this.renderStatus()}
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}
