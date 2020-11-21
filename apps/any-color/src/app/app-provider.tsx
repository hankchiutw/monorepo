import { MessageService } from 'chromex-utils';
import React, { FunctionComponent } from 'react';
import { CapturedTab } from '../models';
import { AppContext } from './app-context';

/* eslint-disable-next-line */
export interface AppProviderProps {}

export const AppProvider: FunctionComponent<AppProviderProps> = (props) => {
  const messageService = new MessageService();

  const context = {
    messageService,
    requestCapture: async (): Promise<HTMLImageElement> => {
      const detail = await messageService.send<CapturedTab>('requestCapture');
      const { imgSrc, width, height } = detail;
      const img = new Image(width, height);
      img.src = imgSrc;
      return img;
    },
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
