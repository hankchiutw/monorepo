import React, { FunctionComponent, useRef, useState } from 'react';
import { Inspector } from './inspector';
import { InspectorContext, IInspectorContext } from './inspector-context';
import { useCursor } from './useCursor';
import { useCells, useInspector } from './useInspector';

/* eslint-disable-next-line */
export interface InspectorProviderProps {}

export const InspectorProvider: FunctionComponent<InspectorProviderProps> = (
  _props
) => {
  const cursor = useCursor();
  const cells = useCells(cursor);
  const inspector = useInspector({ cursor, cells });

  const [image, setImage] = useState(null);
  const context = useRef<IInspectorContext>({
    cursor,
    cells,
    inspector,
    image,
    setImage,
  });

  return (
    <InspectorContext.Provider value={context.current}>
      <Inspector />
    </InspectorContext.Provider>
  );
};

export default InspectorProvider;
