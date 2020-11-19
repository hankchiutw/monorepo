import { PixelPicker } from 'pixel-picker';
import { useState, useEffect, MutableRefObject } from 'react';
import { useAppContext } from './app-context';

export function useCapturedImage(pickerRef: MutableRefObject<PixelPicker>) {
  const { requestCapture } = useAppContext();
  const [image, setImage] = useState<HTMLImageElement>();

  const setCapturedImage = async () => {
    const img = await requestCapture();
    setImage(img);
  };

  useEffect(() => {
    setCapturedImage();

    let timerId: number;
    const debounceSend = () => {
      if (!pickerRef.current.visible) {
        return;
      }
      // to avoid capture the picker itself
      pickerRef.current.visible = false;
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        setCapturedImage();
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

  return { setCapturedImage };
}
