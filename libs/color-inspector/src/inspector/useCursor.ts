import paper from 'paper';
import { useRef, useCallback } from 'react';

const kCursorRaduis = 14;
const kCursorOffset = 18;
const kCursorLineLength = 14;
const kCursorLineWidth = 3;
const kStrokeColor = new paper.Color('#777777');
const kStrokeWidth = 5;

export function useCursor() {
  const init = useCallback(() => {
    console.log('xxx: init cursor');
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
  }, []);
  const cursorRef = useRef<paper.Group>(init());

  return cursorRef.current;
}
