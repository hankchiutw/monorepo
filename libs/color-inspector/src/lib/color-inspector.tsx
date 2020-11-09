import React, { useState, useEffect } from 'react';
import { InspectorProvider } from '../inspector';
import { PaperProjectProvider } from '../paper-project';
import { PublicContext, IPublicContext } from './public-context';

export type ColorInspectorProps = IPublicContext;

export const ColorInspector = (props: ColorInspectorProps) => {
  const [image, setImage] = useState<ColorInspectorProps['image']>();
  const context = {
    image,
  };

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  return (
    <PublicContext.Provider value={context}>
      <PaperProjectProvider>
        <InspectorProvider />
      </PaperProjectProvider>
    </PublicContext.Provider>
  );
};

export default ColorInspector;
