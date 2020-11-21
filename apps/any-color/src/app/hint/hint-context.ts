import React, { useContext } from 'react';

export interface HintContextProps {
  open: ({ content: string }) => void;
}

export const HintContext = React.createContext<HintContextProps>(null);

export function useHintContext() {
  return useContext(HintContext);
}
