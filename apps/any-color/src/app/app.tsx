import { ColorInspector } from '@mono/color-inspector';
import { MessageService } from 'chromex-utils';
import React, { useRef, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface AppProps {}

export const App = (props: AppProps) => {
  const messageService = useRef(new MessageService());
  const [image] = useState<HTMLImageElement>();
  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    messageService.current.send('requestCapture');
    messageService.current.on('toggleInspector', () => {
      console.log('xxx: toggleInspector');
    });
  }, []);

  return <ColorInspector image={image} />;
};

export default App;
