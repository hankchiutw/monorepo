import { ColorInspector } from '@mono/color-inspector';
import { MessageService } from 'chromex-utils';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CapturedTab } from '../models';

/* eslint-disable-next-line */
export interface AppProps {}

export const App = (props: AppProps) => {
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

  useEffect(() => {
    requestCapture();
  }, []);

  return image ? <ColorInspector image={image} /> : null;
};

export default App;
