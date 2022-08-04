import * as PIXI from 'pixi.js';
import { GameState } from './GameState';

export abstract class GameComponent {
  protected root: PIXI.Container;
  protected app: PIXI.Application;
  protected state: GameState;

  public static bootstrap(app: PIXI.Application, state: GameState, components: GameComponent[]) {
    components.forEach(component => {
      component.app = app;
      component.state = state;
      component.root = new PIXI.Container();

      app.stage.addChild(component.root);

      component.start();

      app.ticker.add(() => {
        component.update(app.ticker.deltaMS);
      });
    });
  }

  protected get view() {
    return this.app.view;
  }

  public start() {}
  public update(delta: number) {}
}
