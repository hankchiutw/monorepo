import React, { useState, useEffect } from 'react';
import { InspectorProvider } from '../inspector';
import { PaperProjectProvider } from '../paper-project';
import { PublicContext, IPublicContext } from './public-context';

export type ColorInspectorProps = IPublicContext;

export const ColorInspector = (props: ColorInspectorProps) => {
  const [context, setContext] = useState<IPublicContext>();

  useEffect(() => {
    setContext({
      image: props.image,
    });
  }, [props.image]);

  return (
    <PaperProjectProvider>
      <PublicContext.Provider value={context}>
        <InspectorProvider />
      </PublicContext.Provider>
    </PaperProjectProvider>
  );
};

export default ColorInspector;
