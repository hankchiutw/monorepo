import { MessageService } from 'chromex-utils';
import React, { useContext } from 'react';
import { CapturedTab } from '../models';

export interface IAppContext {
  messageService: MessageService;
  requestCapture: () => Promise<HTMLImageElement>;
}

const messageService = new MessageService();

export const AppContext = React.createContext<IAppContext>({
  messageService,
  requestCapture: async (): Promise<HTMLImageElement> => {
    const detail = await messageService.send<CapturedTab>('requestCapture');
    const { imgSrc, width, height } = detail;
    const img = new Image(width, height);
    img.src = imgSrc;
    return img;
  },
});

export function useAppContext() {
  return useContext(AppContext);
}
