import React from 'react';

/* eslint-disable-next-line */
export interface ColorInspectorProps {}

export const ColorInspector = (props: ColorInspectorProps) => {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to color-inspector!</h1>
    </div>
  );
};

export default ColorInspector;
