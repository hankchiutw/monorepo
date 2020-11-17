import { MessageService } from 'chromex-utils';
import { pixelPickerFactory, PixelPicker } from 'pixel-picker';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CapturedTab } from '../models';

/* eslint-disable-next-line */
export interface AppProps {}

function useCapture(): [HTMLImageElement, () => void] {
  const messageService = useRef(new MessageService());
  const [image, setImage] = useState<HTMLImageElement>();

  const requestCapture = useCallback(async () => {
    const detail = await messageService.current.send<CapturedTab>(
      'requestCapture'
    );
    const { imgSrc, width, height } = detail;
    const img = new Image(width, height);
    img.src = imgSrc;
    setImage(img);
  }, []);

  return [image, requestCapture];
}

export const App = (_props: AppProps) => {
  const [image, requestCapture] = useCapture();
  const canvasRef = useRef();
  const pickerRef = useRef<PixelPicker>();

  useEffect(() => {
    pickerRef.current = pixelPickerFactory(canvasRef.current);
    requestCapture();

    let timerId: number;
    const debounceSend = () => {
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
    pickerRef.current.image = image;
    pickerRef.current.visible = true;
  }, [image]);

  return <canvas ref={canvasRef}></canvas>;
};

export default App;
