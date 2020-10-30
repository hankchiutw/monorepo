import paper from 'paper';
import React, { useContext } from 'react';
import { PixelCell } from './pixel-cell';

export interface IInspectorContext {
  cursor: paper.Group;
  cells: PixelCell[];
  inspector: paper.Group;
}

export const InspectorContext = React.createContext<IInspectorContext>(null);

export function useInspectorContext() {
  return useContext(InspectorContext);
}
