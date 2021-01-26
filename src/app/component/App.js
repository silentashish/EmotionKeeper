import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// screen imports here
import LogInScreen from './Auth/LogInScreen';
import SignUpScreen from './Auth/SignUpScreen';
import AuthLoadingScreen from './Auth/AuthLoadingScreen';
import HomeScreen from './App/HomeScreen';
import UserScreen from './App/UserScreen';
import StartScreen from './App/StartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const AuthNavigator = StackNavigator({
//   SignIn: LogInScreen,
//   SignUp: SignUpScreen,
// });

// const AppNavigator = DrawerNavigator({
//   Home: HomeScreen,
//   User: UserScreen,
// });

// const RootNavigator = SwitchNavigator(
//   {
//     AuthLoader: AuthLoadingScreen,
//     Auth: AuthNavigator,
//     App: AppNavigator,
//   },
//   {
//     initialRouteName: 'AuthLoader',
//   },
// );

// export default class App extends React.Component {
//   render() {
//     return <RootNavigator />;
//   }
// }
