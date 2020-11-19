import { pixelPickerFactory, PixelPicker } from 'pixel-picker';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CapturedTab } from '../models';
import { useAppContext } from './app-context';

/* eslint-disable-next-line */
export interface AppProps {}

function useCapture(): [HTMLImageElement, () => void] {
  const { messageService } = useAppContext();
  const [image, setImage] = useState<HTMLImageElement>();

  const requestCapture = useCallback(async () => {
    const detail = await messageService.send<CapturedTab>('requestCapture');
    const { imgSrc, width, height } = detail;
    const img = new Image(width, height);
    img.src = imgSrc;
    setImage(img);
  }, []);

  return [image, requestCapture];
}

export const App = (_props: AppProps) => {
  const { messageService } = useAppContext();
  const [image, requestCapture] = useCapture();
  const canvasRef = useRef();
  const pickerRef = useRef<PixelPicker>();

  useEffect(() => {
    pickerRef.current = pixelPickerFactory(canvasRef.current);
    requestCapture();

    let timerId: number;
    const debounceSend = () => {
      if (!pickerRef.current.visible) {
        return;
      }
      // to avoid capture the picker itself
      pickerRef.current.visible = false;
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        requestCapture();
      }, 200);
    };
    window.addEventListener('scroll', debounceSend);
    window.addEventListener('resize', debounceSend);
    return () => {
      window.removeEventListener('scroll', debounceSend);
      window.removeEventListener('resize', debounceSend);
    };
  }, []);

  useEffect(() => {
    messageService.on('toggleInspector', () => {
      pickerRef.current.visible = !pickerRef.current.visible;
      if (pickerRef.current.visible) {
        requestCapture();
      }
    });
  }, []);

  useEffect(() => {
    pickerRef.current.image = image;
    pickerRef.current.visible = true;
  }, [image]);

  return <canvas ref={canvasRef}></canvas>;
};

export default App;
