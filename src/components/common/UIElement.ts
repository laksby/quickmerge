import { GameComponent } from '../../core';

export interface UIElementOptions {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

export class UIElement<TOptions extends UIElementOptions = UIElementOptions> extends GameComponent {
  protected options: TOptions;

  constructor(options: TOptions) {
    super();
    this.options = options;
  }

  public get x() {
    return this.options.x ?? 0;
  }

  public get y() {
    return this.options.y ?? 0;
  }

  public get width() {
    return this.options.width;
  }

  public get height() {
    return this.options.height;
  }

  public position(x: number, y: number) {
    this.options.x = x;
    this.options.y = y;
  }

  public start() {
    this.root.x = this.x;
    this.root.y = this.y;
  }

  public update() {
    if (this.x !== this.root.x) {
      this.root.x = this.x;
    }

    if (this.y !== this.root.y) {
      this.root.y = this.y;
    }
  }
}
