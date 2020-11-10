import paper from 'paper';
import { PixelCell } from './pixel-cell';

const kCursorRaduis = 14;
const kCursorOffset = 18;
const kCursorLineLength = 14;
const kCursorLineWidth = 3;
const kStrokeColor = new paper.Color('#777777');
const kStrokeWidth = 5;

const kInspectorSize = 11; // should be odd
const kCellSize = 30;

export function createCursor() {
  return new paper.Group([
    new paper.Path.Circle({
      center: new paper.Point(kCursorOffset, kCursorOffset),
      radius: kCursorRaduis,
      strokeWidth: kStrokeWidth * 1.2,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset, kCursorOffset - kCursorRaduis],
      to: [kCursorOffset, kCursorOffset - kCursorRaduis - kCursorLineLength],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset, kCursorOffset + kCursorRaduis],
      to: [kCursorOffset, kCursorOffset + kCursorRaduis + kCursorLineLength],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset - kCursorRaduis, kCursorOffset],
      to: [kCursorOffset - kCursorRaduis - kCursorLineLength, kCursorOffset],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset + kCursorRaduis, kCursorOffset],
      to: [kCursorOffset + kCursorRaduis + kCursorLineLength, kCursorOffset],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
  ]);
}

export function createCells(cursor: paper.Group): PixelCell[] {
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
}

export function createInspector({
  cursor,
  cells,
}: {
  cursor: paper.Group;
  cells: PixelCell[];
}) {
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

  const targetCell = cells[(cells.length - 1) / 2];
  targetCell.highlight();
  const inspector = new paper.Group([mask, cursor]);
  inspector.pivot = new paper.Point(0, 0);
  return inspector;
}
