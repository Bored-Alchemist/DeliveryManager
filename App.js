import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, AsyncStorage, StatusBar } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { Provider } from "react-redux";
import store from "./src/store";
import Alert from './src/components/Alert';

const App = () => {
  const [load, setLoad] = useState(false)
  const [isuser, setUser] = useState(false)
  useEffect(() => {
    isLoggedIn()
  },[]);

  const isLoggedIn = async () => {
    const user = await AsyncStorage.getItem('user');
    if(user) {setUser(true)}
    setLoad(true)
  }

  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex: 1 , marginTop: StatusBar.currentHeight }}>
      {load && <View style={{ flex: 1 }}>
        <Navigation isLoggedIn={isuser} />
        <Alert />
      </View> }
  </SafeAreaView>
  </Provider>
  );
};


export default App;