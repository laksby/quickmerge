import { UIElement, UIElementOptions } from './UIElement';

export interface LayoutVOptions extends UIElementOptions {
  gap?: number;
  elements: UIElement[];
}

export class LayoutV extends UIElement<LayoutVOptions> {
  private totalHeight = 0;

  public get gap() {
    return this.options.gap ?? 0;
  }

  public start() {
    super.start();

    this.options.elements.forEach(element => {
      this.child(element);
      this.totalHeight += element.height;
    });

    if (this.options.elements.length > 0) {
      this.totalHeight += this.gap * (this.options.elements.length - 1);
    }

    this.layout();
  }

  private layout() {
    let offset = 0;

    this.options.elements.forEach(element => {
      element.position((this.width - element.width) / 2, (this.height - this.totalHeight) / 2 + offset);
      offset += element.height + this.gap;
    });
  }
}
