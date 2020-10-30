import React, { FunctionComponent, useRef } from 'react';
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
  const context = useRef<IInspectorContext>({
    cursor,
    cells,
    inspector,
  });

  return (
    <InspectorContext.Provider value={context.current}>
      <Inspector />
    </InspectorContext.Provider>
  );
};

export default InspectorProvider;
