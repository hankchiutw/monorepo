import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { Inspector } from './inspector';
import { InspectorContext, IInspectorContext } from './inspector-context';
import {
  createCells,
  createCursor,
  createInspector,
} from './primitive-factory';

/* eslint-disable-next-line */
export interface InspectorProviderProps {}

export const InspectorProvider: FunctionComponent<InspectorProviderProps> = (
  _props
) => {
  const [raster, setRaster] = useState(null);
  const context = useRef<IInspectorContext>({
    cursor: null,
    cells: [],
    inspector: null,
    raster,
    setRaster,
  });

  useEffect(() => {
    const cursor = createCursor();
    const cells = createCells(cursor);
    const inspector = createInspector({ cursor, cells });

    context.current.cursor = cursor;
    context.current.cells = cells;
    context.current.inspector = inspector;
  }, []);

  return (
    <InspectorContext.Provider value={context.current}>
      {context.current.inspector ? <Inspector /> : null}
    </InspectorContext.Provider>
  );
};

export default InspectorProvider;
