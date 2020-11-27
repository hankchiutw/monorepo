import React, { useEffect } from 'react';
import { useAppContext } from '../app-context';
import { ColorLabel } from '../color-label';
import { useHintContext } from '../hint';
import { useCapturedImage } from '../hooks';
import { usePicker } from './usePicker';

/* eslint-disable-next-line */
export interface PickerProps {}

export const Picker = (_props: PickerProps) => {
  const { messageService } = useAppContext();
  const { open: openHint } = useHintContext();
  const { pickerRef, canvasRef } = usePicker();
  const { setCapturedImage } = useCapturedImage(pickerRef);

  useEffect(() => {
    messageService.on('toggleInspector', () => {
      pickerRef.current.visible = !pickerRef.current.visible;
      if (pickerRef.current.visible) {
        setCapturedImage();
      }
    });

    window.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        pickerRef.current.visible = false;
      }
    });

    pickerRef.current.onCopy = (hex: string) => {
      openHint({
        content: <ColorLabel color={hex}>{hex} copied!</ColorLabel>,
      });
      pickerRef.current.visible = false;
    };
  }, []);

  return (
    <>
      <style jsx>{`
        canvas {
          position: fixed;
          z-index: ${Number.MAX_SAFE_INTEGER};
        }
      `}</style>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Picker;
