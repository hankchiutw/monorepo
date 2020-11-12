import React from 'react';
import { InspectorProvider } from '../inspector';
import { PaperProjectProvider } from '../paper-project';
import { PublicContext, IPublicContext } from './public-context';

export type ColorInspectorProps = IPublicContext;

export const ColorInspector = (props: ColorInspectorProps) => {
  return (
    <PaperProjectProvider>
      <PublicContext.Provider value={props}>
        <InspectorProvider />
      </PublicContext.Provider>
    </PaperProjectProvider>
  );
};

export default ColorInspector;
