import { pixelPickerFactory, PixelPicker } from 'pixel-picker';
import { useRef, useEffect } from 'react';

export function usePicker() {
  const canvasRef = useRef();
  const pickerRef = useRef<PixelPicker>();

  useEffect(() => {
    pickerRef.current = pixelPickerFactory(canvasRef.current);
  }, []);

  return { pickerRef, canvasRef };
}
