import paper from 'paper';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { PaperProjectContext } from './paper-project-context';

/* eslint-disable-next-line */
export interface PaperProjectProviderProps {}

export const PaperProjectProvider: FunctionComponent<PaperProjectProviderProps> = (
  props
) => {
  const [context, setContext] = useState<paper.Project>();
  const canvasCallback = useCallback((canvasRef) => {
    if (canvasRef) {
      setContext(new paper.Project(canvasRef));
    }
  }, []);

  return (
    <PaperProjectContext.Provider value={context}>
      <style jsx>{`
        canvas {
          position: fixed;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <canvas ref={canvasCallback}></canvas>
      {context ? props.children : null}
    </PaperProjectContext.Provider>
  );
};

export default PaperProjectProvider;
