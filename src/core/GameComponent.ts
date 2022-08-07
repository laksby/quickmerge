import * as PIXI from 'pixi.js';
import { GameState } from './GameState';

export interface GameComponentOptions {
  name?: string;
}

export abstract class GameComponent {
  protected name?: string;
  protected app: PIXI.Application;
  protected state: GameState;
  protected root: PIXI.Container;
  protected children: GameComponent[] = [];

  constructor(options: GameComponentOptions = {}) {
    this.name = options.name;
  }

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

    if (component.name) {
      component.root.name = component.name;
    }

    root.addChild(component.root);

    component.start();

    app.ticker.add(() => {
      component.update(app.ticker.deltaMS);
    });
  }

  protected get viewport() {
    return this.app.view;
  }

  protected get renderer() {
    return this.app.renderer;
  }

  protected get interaction(): PIXI.InteractionManager {
    return this.renderer.plugins.interaction;
  }

  protected addChildren(...components: GameComponent[]) {
    components.forEach(component => {
      this.children.push(component);
      GameComponent.bootstrapComponent(this.app, this.state, this.root, component);
    });
  }

  protected resource(name: string) {
    return PIXI.Loader.shared.resources[name];
  }

  protected findByName<T extends GameComponent>(name: string): T {
    return this.findChildByName(name, this.children) as T;
  }

  public start() {}
  public update(delta: number) {}

  private findChildByName(name: string, components: GameComponent[]): GameComponent | undefined {
    for (let i = 0; i < components.length; i++) {
      const component = components[i];

      if (component.name === name) {
        return component;
      }

      const child = this.findChildByName(name, component.children);

      if (child) {
        return child;
      }
    }

    return undefined;
  }
}
