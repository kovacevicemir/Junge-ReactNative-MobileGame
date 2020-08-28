import React, { useState, useEffect } from 'react'
import {Text} from "react-native";
import JungleNavigation from "./navigation/JungleNavigation"
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk'
import { Provider } from "react-redux";
import userReducer from "./store/reducers/user";
import worldReducer from "./store/reducers/world"
import * as Font from 'expo-font'
import { AppLoading } from 'expo';


import { enableScreens } from "react-native-screens";
enableScreens();



const rootReducer = combineReducers({
  user:userReducer,
  world:worldReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk)),
);

export default function App() {
  const [fontLoaded, setfontLoaded] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Robo': require('./assets/fonts/Roboto-Bold.ttf'),
        'Gaming': require('./assets/fonts/MetalMania-Regular.ttf')
      })
      setfontLoaded(true);
    };
    loadFonts();
  }, []);

  if(!fontLoaded){
    return <Text>Loading</Text>
  }

  return (
    <Provider store={store}>
      <JungleNavigation />
    </Provider>
  );
}
