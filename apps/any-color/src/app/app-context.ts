import { MessageService } from 'chromex-utils';
import React, { useContext } from 'react';

export interface IAppContext {
  messageService: MessageService;
}

export const AppContext = React.createContext<IAppContext>({
  messageService: new MessageService(),
});

export function useAppContext() {
  return useContext(AppContext);
}
