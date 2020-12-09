import { PixelPicker, pixelPickerFactory } from 'pixel-picker';
import React, { useContext, useRef, useEffect } from 'react';
import styles from './picker.styles';
import { SnackbarContext } from './snackbar';

/* eslint-disable-next-line */
export interface PickerProps {
  imageUrl: string;
}

export default function Picker(props: PickerProps) {
  const { imageUrl } = props;
  const snackbar = useContext(SnackbarContext);

  const pageImgRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const imgElm = pageImgRef.current;
    const canvasElm = canvasRef.current;

    if (!imgElm || !canvasElm) {
      return;
    }

    const picker: PixelPicker = pixelPickerFactory(canvasElm);
    picker.image = imgElm;
    window.addEventListener('resize', () => {
      picker.image = imgElm;
    });

    picker.onCopy = (hex: string) => {
      snackbar.current.open(hex);
    };
  }, [pageImgRef, canvasRef]);
  return (
    <>
      <style jsx>{styles}</style>
      <img src={imageUrl} ref={pageImgRef}></img>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
