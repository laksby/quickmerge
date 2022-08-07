import { UIElement, UIElementOptions } from './UIElement';

export enum LayoutHAlign {
  MiddleLeft,
  MiddleCenter,
}

export interface LayoutHOptions extends UIElementOptions {
  align?: LayoutHAlign;
  gap?: number;
  elements: UIElement[];
}

export class LayoutH extends UIElement<LayoutHOptions> {
  private totalWidth = 0;

  public get align() {
    return this.options.align ?? LayoutHAlign.MiddleCenter;
  }

  public get gap() {
    return this.options.gap ?? 0;
  }

  public start() {
    super.start();

    this.options.elements.forEach(element => {
      this.addChildren(element);
      this.totalWidth += element.width;
    });

    if (this.options.elements.length > 0) {
      this.totalWidth += this.gap * (this.options.elements.length - 1);
    }

    this.layout();
  }

  private layout() {
    let offset = 0;

    this.options.elements.forEach(element => {
      switch (this.align) {
        case LayoutHAlign.MiddleLeft:
          element.position(offset, (this.height - element.height) / 2);
          break;

        case LayoutHAlign.MiddleCenter:
          element.position((this.width - this.totalWidth) / 2 + offset, (this.height - element.height) / 2);
          break;
      }

      offset += element.width + this.gap;
    });
  }
}
