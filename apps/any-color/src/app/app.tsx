import React, { useEffect } from 'react';
import { useAppContext } from './app-context';
import { useCapturedImage } from './hooks';
import { usePicker } from './picker';

/* eslint-disable-next-line */
export interface AppProps {}

export const App = (_props: AppProps) => {
  const { messageService } = useAppContext();
  const { pickerRef, canvasRef } = usePicker();
  const { setCapturedImage } = useCapturedImage(pickerRef);

  useEffect(() => {
    messageService.on('toggleInspector', () => {
      pickerRef.current.visible = !pickerRef.current.visible;
      if (pickerRef.current.visible) {
        setCapturedImage();
      }
    });
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default App;
