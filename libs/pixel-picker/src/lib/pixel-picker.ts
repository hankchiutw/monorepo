import paper from 'paper';
import { Inspector, OnCopyCallback } from './inspector';

export class PixelPicker {
  public set image(img: HTMLImageElement) {
    if (!img) {
      return;
    }
    this.inspector.image = img;
  }

  public set onCopy(callback: OnCopyCallback) {
    if (typeof callback !== 'function') {
      return;
    }
    this.inspector.onCopy = callback;
  }

  public get visible() {
    return this.project.view.element.style.visibility === 'inherit';
  }

  public set visible(value: boolean) {
    this.project.view.element.style.visibility = value ? 'inherit' : 'hidden';
    this.project.view.element.style.cursor = value ? 'none' : 'inherit';
  }

  constructor(private inspector: Inspector, private project: paper.Project) {
    this.trackMouse();
  }

  /**
   * Keep inspector's position sync with mouse.
   */
  private trackMouse() {
    this.project.view.on('mousemove', ({ point }) => {
      this.inspector.position = point;
    });

    document.body.addEventListener('mouseenter', ({ clientX, clientY }) => {
      this.inspector.position = new paper.Point(clientX, clientY);
    });
  }
}

export function pixelPickerFactory(canvas: HTMLCanvasElement) {
  canvas.style.cursor = 'none';

  const project = new paper.Project(canvas);
  const inspector = new Inspector(project);
  return new PixelPicker(inspector, project);
}
