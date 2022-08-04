import { GameState } from '../state';
import * as PIXI from 'pixi.js';
import { Style } from './Style';
import { autorun } from 'mobx';

export abstract class Component {
  protected style: Style;
  protected rootObject: PIXI.DisplayObject;
  protected app: PIXI.Application;
  protected state: GameState;

  constructor(initialStyle: Partial<Style> = {}) {
    this.style = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      ...initialStyle,
    };
  }

  public static bootstrap(app: PIXI.Application, state: GameState, components: Component[]) {
    components.forEach(component => {
      component.app = app;
      component.state = state;
      component.style = component.getStyle();
      component.rootObject = component.createRootObject();

      app.stage.addChild(component.rootObject);

      component.start();
      autorun(() => component.update());
    });
  }

  public getStyle(): Style {
    return this.style;
  }

  public abstract createRootObject(): PIXI.DisplayObject;
  public start() {}
  public update() {}
}
