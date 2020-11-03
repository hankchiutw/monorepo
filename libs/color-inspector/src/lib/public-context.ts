import React, { useContext } from 'react';

export interface IPublicContext {
  image: HTMLImageElement;
}

export const PublicContext = React.createContext<IPublicContext>(null);

export function usePublicContext() {
  return useContext(PublicContext);
}
