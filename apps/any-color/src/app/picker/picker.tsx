import React, { useEffect } from 'react';
import { useAppContext } from '../app-context';
import { useCapturedImage } from '../hooks';
import { usePicker } from './usePicker';

/* eslint-disable-next-line */
export interface PickerProps {}

export const Picker = (_props: PickerProps) => {
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

export default Picker;
