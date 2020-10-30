import React from 'react';
import { InspectorProvider } from '../inspector';
import { PaperProjectProvider } from '../paper-project';

/* eslint-disable-next-line */
export interface ColorInspectorProps {}

export const ColorInspector = (props: ColorInspectorProps) => {
  return (
    <PaperProjectProvider>
      <InspectorProvider />
    </PaperProjectProvider>
  );
};

export default ColorInspector;
