import React from 'react';
import { AppProvider } from './app-provider';
import { HintProvider } from './hint';
import { Picker } from './picker';

/* eslint-disable-next-line */
export interface AppProps {}

export const App = (_props: AppProps) => {
  return (
    <AppProvider>
      <HintProvider>
        <Picker></Picker>
      </HintProvider>
    </AppProvider>
  );
};

export default App;
