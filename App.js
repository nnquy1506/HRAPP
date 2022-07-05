import React, { useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./src/redux/reducers";
import StackNavigator from "./src/navigation/TabBottomNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import theme from "./src/themes/default";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <StackNavigator />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
