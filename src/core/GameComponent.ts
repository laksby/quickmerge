import * as PIXI from 'pixi.js';
import { GameState } from './GameState';

export abstract class GameComponent {
  protected app: PIXI.Application;
  protected state: GameState;
  protected root: PIXI.Container;
  protected children: GameComponent[] = [];

  public static bootstrap(app: PIXI.Application, state: GameState, components: GameComponent[]) {
    components.forEach(component => {
      GameComponent.bootstrapComponent(app, state, app.stage, component);
    });
  }

  private static bootstrapComponent(
    app: PIXI.Application,
    state: GameState,
    root: PIXI.Container,
    component: GameComponent,
  ) {
    component.app = app;
    component.state = state;
    component.root = new PIXI.Container();

    root.addChild(component.root);

    component.start();

    app.ticker.add(() => {
      component.update(app.ticker.deltaMS);
    });
  }

  protected get viewport() {
    return this.app.view;
  }

  protected child<T extends GameComponent>(component: T): T {
    this.children.push(component);
    GameComponent.bootstrapComponent(this.app, this.state, this.root, component);
    return component;
  }

  public start() {}
  public update(delta: number) {}
}
