import * as React from "react";
import { View, Text } from "react-native";
import JungleNavigation from "./navigation/JungleNavigation"
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk'
import { Provider } from "react-redux";
import userReducer from "./store/reducers/user";

import { enableScreens } from "react-native-screens";
enableScreens();


const rootReducer = combineReducers({
  user:userReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk)),
);

export default function App() {
  return (
    <Provider store={store}>
      <JungleNavigation />
    </Provider>
  );
}
