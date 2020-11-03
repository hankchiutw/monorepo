import paper from 'paper';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { usePublicContext } from '../lib/public-context';
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

function useImageHandler() {
  const { image } = usePublicContext();
  const paperProject = usePaperProject();
  const { setRaster } = useInspectorContext();

  useEffect(() => {
    const { width, height } = image;
    paperProject.view.viewSize = new paper.Size(width, height);
    const rasterize = () => {
      const raster = new paper.Raster(image);
      raster.position = new paper.Point(width / 2, height / 2);
      raster.width = width;
      raster.height = height;
      raster.visible = false;

      setRaster(raster);

      // refresh
      // this.moveTo(this.group.position);
    };

    image.complete ? rasterize() : image.addEventListener('load', rasterize);
  }, [image, setRaster, paperProject]);
}

export const Inspector: FunctionComponent<InspectorProps> = (_props) => {
  useMouseHandler();
  useImageHandler();

  return <div></div>;
};

export default Inspector;
