import * as React from "react";
import Main from './component/MainComponent';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import LoadingComponent from './component/LoadingComponent';

const { presistor, store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingComponent />}
        persistor ={presistor}
      >
        <Main />
      </PersistGate>
    </Provider>
  );
}


