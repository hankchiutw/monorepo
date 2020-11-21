import { MessageService } from 'chromex-utils';
import React, { useContext } from 'react';

export interface AppContextProps {
  messageService: MessageService;
  requestCapture: () => Promise<HTMLImageElement>;
}

export const AppContext = React.createContext<AppContextProps>(null);

export function useAppContext() {
  return useContext(AppContext);
}
