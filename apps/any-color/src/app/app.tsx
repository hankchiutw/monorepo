import { ColorInspector } from '@mono/color-inspector';
import React from 'react';

/* eslint-disable-next-line */
export interface AppProps {}

export const App = (props: AppProps) => {
  const image = new Image();
  return <ColorInspector image={image} />;
};

export default App;
