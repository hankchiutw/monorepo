import paper from 'paper';
import { useRef, useCallback } from 'react';
import { PixelCell } from './pixel-cell';

const kInspectorSize = 11; // should be odd
const kCellSize = 30;
const kStrokeColor = new paper.Color('#777777');
const kStrokeWidth = 5;

export function useCells(cursor: paper.Group) {
  const init = useCallback(() => {
    const cells = [];
    // make the inspector center representing the cursor center
    const offset = cursor.position.subtract((kInspectorSize - 1) / 2);
    for (let x = 0; x < kInspectorSize; x++) {
      for (let y = 0; y < kInspectorSize; y++) {
        cells.push(
          PixelCell.create({
            pixelAt: new paper.Point(x, y),
            pivot: new paper.Point(x, y).add(offset),
            size: kCellSize,
          })
        );
      }
    }
    return cells;
  }, [cursor]);
  const cellsRef = useRef<PixelCell[]>(init());

  return cellsRef.current;
}

export function useInspector({
  cursor,
  cells,
}: {
  cursor: paper.Group;
  cells: PixelCell[];
}) {
  const init = useCallback(() => {
    const radius = (kInspectorSize * kCellSize) / 2;
    const circleClip = new paper.Shape.Circle({
      center: [radius, radius],
      radius: radius,
    });

    const circleBorder = new paper.Shape.Circle({
      center: [radius, radius],
      radius,
      strokeColor: kStrokeColor,
      strokeWidth: kStrokeWidth,
    });

    const mask = new paper.Group([
      circleClip,
      ...cells.map((c) => c.raw),
      circleBorder,
    ]);
    mask.clipped = true;

    const inspector = new paper.Group([mask, cursor]);
    inspector.pivot = new paper.Point(0, 0);
    return inspector;
  }, [cursor, cells]);

  const inspectorRef = useRef<paper.Group>(init());
  return inspectorRef.current;
}
