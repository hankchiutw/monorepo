import paper from 'paper';
import React, { FunctionComponent, useReducer, useEffect } from 'react';
import { usePublicContext } from '../lib/public-context';
import { usePaperProject } from '../paper-project';
import { Inspector } from './inspector';
import { InspectorContext, IInspectorContext } from './inspector-context';
import {
  createCells,
  createCursor,
  createInspector,
} from './primitive-factory';

/* eslint-disable-next-line */
export interface InspectorProviderProps {}

interface Action {
  type: string;
  payload?: any;
}

function reducer(state: IInspectorContext, action: Action) {
  switch (action.type) {
    case 'init': {
      const cursor = createCursor();
      const cells = createCells(cursor);
      const inspector = createInspector({ cursor, cells });
      return { ...state, cursor, cells, inspector };
    }
    case 'updateImage': {
      const { image, paperProject } = action.payload;
      const { width, height } = image;
      paperProject.view.viewSize = new paper.Size(width, height);
      const raster = new paper.Raster(image);
      raster.position = new paper.Point(width / 2, height / 2);
      raster.width = width;
      raster.height = height;
      raster.visible = false;

      return { ...state, raster };
    }
    default:
      throw new Error();
  }
}

export const InspectorProvider: FunctionComponent<InspectorProviderProps> = (
  _props
) => {
  const [state, dispatch] = useReducer(reducer, {
    cursor: null,
    cells: [],
    inspector: null,
    raster: null,
  });

  const { image } = usePublicContext();
  const paperProject = usePaperProject();

  useEffect(() => {
    dispatch({ type: 'init' });
  }, []);

  useEffect(() => {
    const updateImage = () =>
      dispatch({
        type: 'updateImage',
        payload: {
          image,
          paperProject,
        },
      });
    image.complete
      ? updateImage()
      : image.addEventListener('load', updateImage);
  }, [image, paperProject]);

  return (
    <InspectorContext.Provider value={state}>
      {state.inspector ? <Inspector /> : null}
    </InspectorContext.Provider>
  );
};

export default InspectorProvider;
