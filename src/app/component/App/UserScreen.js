import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';
// import graphUtil from '../../graphUtil/graphUtil';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from '../../style/styleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PieGraph from './PieGraph';
import LineGraph from './LineGraph';
import {Header} from './HomeScreen';

export default class UserScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emotions: [],
      chartType: 'pie',
      filterType: 'day',
      allData: [],
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        this.setState({emotions: JSON.parse(value)});
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();
    this.collectData();
  }

  collectData() {
    // const uid = firebase.auth().currentUser.uid;
    // firebase.database().ref(`emotions/${uid}`).on('value', snapshot => {
    //   this.setState({
    //     emotions: Object.values(snapshot.val())
    //   });
    // });
  }

  filterData() {
    const end = moment();
    let start;
    switch (this.state.filterType) {
      case 'day':
        start = moment().subtract(24, 'hours').unix();
        break;
      case 'week':
        start = moment().subtract(7, 'days').unix();
        break;
      case 'month':
        start = moment().subtract(1, 'months').unix();
        break;
    }
    // Get current date, then calculate the range of data from 12AM to 11:59PM
    const filteredData = [];
    this.state.emotions.forEach((data) => {
      if (data.time >= start && data.time <= end) {
        data.date = new Date(data.time);
        filteredData.push(data);
      }
    });
    console.log('Data to look is', this.state.emotions, filteredData);
    return filteredData;
  }

  renderChart() {
    const data = this.filterData();
    if (data.length < 1)
      return (
        <View style={styles.chartContainer}>
          <Text style={{color: '#283845', fontSize: 20}}>
            You haven't saved any diary
          </Text>
        </View>
      );
    if (this.state.chartType === 'pie') {
      return (
        <View style={styles.chartContainer}>
          <PieGraph data={data} />
        </View>
      );
    } else {
      return (
        <View style={styles.chartContainer}>
          <LineGraph data={data} />
        </View>
      );
    }
  }

  signOut() {
    // firebase.auth().signOut().then(() => {
    //   this.props.navigation.navigate('Auth');
    // });
  }

  render() {
    const assetPath = '../../../images/assets';

    return (
      <LinearGradient style={styles.container} colors={['#28313B', '#485461']}>
        <Header />
        <View style={styles.innerContainer}>
          <View style={styles.chartOption}>
            <TouchableOpacity onPress={() => this.setState({chartType: 'pie'})}>
              <Text
                style={{
                  fontWeight: this.state.chartType === 'pie' ? '700' : '300',
                  color: 'white',
                  marginTop: 10,
                  fontSize: 22,
                }}>
                Pie Chart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({chartType: 'line'})}>
              <Text
                style={{
                  fontWeight: this.state.chartType === 'line' ? '700' : '300',
                  color: 'white',
                  marginTop: 10,
                  fontSize: 22,
                }}>
                Line Chart
              </Text>
            </TouchableOpacity>
          </View>

          {this.renderChart()}

          <View style={styles.chartFilter}>
            <TouchableOpacity
              onPress={() => this.setState({filterType: 'day'})}>
              <Text
                style={{
                  fontWeight: this.state.filterType === 'day' ? '700' : '100',
                  fontSize: 18,
                  color: 'white',
                }}>
                Last 24h
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({filterType: 'week'})}>
              <Text
                style={{
                  fontWeight: this.state.filterType === 'week' ? '700' : '100',
                  fontSize: 18,
                  color: 'white',
                }}>
                This week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({filterType: 'month'})}>
              <Text
                style={{
                  fontWeight: this.state.filterType === 'month' ? '700' : '100',
                  fontSize: 18,
                  color: 'white',
                }}>
                This month
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={() =>
              this.props.navigation.navigate('Home', {data: true})
            }>
            <Text>Go Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
