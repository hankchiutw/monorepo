import React from 'react';
import { PaperProjectProvider } from '../paper-project';
import { Cursor } from '../ui-cursor/cursor';

/* eslint-disable-next-line */
export interface ColorInspectorProps {}

export const ColorInspector = (props: ColorInspectorProps) => {
  return (
    <PaperProjectProvider>
      <Cursor />
      <div>
        <style jsx>{`
          div {
            color: pink;
          }
        `}</style>
        <h1>Welcome to color-inspector!</h1>
      </div>
    </PaperProjectProvider>
  );
};

export default ColorInspector;
