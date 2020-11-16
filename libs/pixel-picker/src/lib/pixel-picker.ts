import paper from 'paper';
import { Inspector } from './inspector';

export class PixelPicker {
  public set image(img: HTMLImageElement) {
    this.inspector.image = img;
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
  canvas.style.position = 'fixed';
  canvas.style.cursor = 'none';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = `${Number.MAX_SAFE_INTEGER}`;

  const project = new paper.Project(canvas);
  const inspector = new Inspector(project);
  return new PixelPicker(inspector, project);
}
