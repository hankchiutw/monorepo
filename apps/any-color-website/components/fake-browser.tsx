import { PixelPicker, pixelPickerFactory } from 'pixel-picker';
import React, { useContext, useRef, useEffect } from 'react';
import styles from './fake-browser.styles';
import { SnackbarContext } from './snackbar';

export default function FakeBrowser() {
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
      <div className="host">
        <div className="head">
          <div className="button button--red"></div>
          <div className="button button--yellow"></div>
          <div className="button button--green"></div>
          <div className="search-bar">Pick any pixel color from a web page</div>
        </div>
        <div className="content">
          <img src="/page.png" ref={pageImgRef}></img>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </>
  );
}
