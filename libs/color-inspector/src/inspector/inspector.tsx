import paper from 'paper';
import { FunctionComponent, useCallback, useEffect } from 'react';
import { usePaperProject } from '../paper-project';
import { useInspectorContext } from './inspector-context';

/* eslint-disable-next-line */
export interface InspectorProps {}

function useMoveTo() {
  const { inspector, cells, raster } = useInspectorContext();

  return useCallback(
    (point) => {
      inspector.position = point;

      if (raster) {
        cells.forEach((cell) => {
          cell.setColor(raster.getPixel(cell.position));
        });
      }
    },
    [inspector, cells, raster]
  );
}

function useMouseHandler() {
  const paperProject = usePaperProject();
  const moveTo = useMoveTo();

  useEffect(() => {
    paperProject.view.on('mousemove', ({ point }) => {
      moveTo(point);
    });

    document.body.addEventListener('mouseenter', ({ clientX, clientY }) => {
      moveTo(new paper.Point(clientX, clientY));
    });
  }, [paperProject, moveTo]);
}

export const Inspector: FunctionComponent<InspectorProps> = (_props) => {
  useMouseHandler();

  return null;
};

export default Inspector;
