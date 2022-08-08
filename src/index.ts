import FontFaceObserver from 'fontfaceobserver';
import * as PIXI from 'pixi.js';
import { DefeatPopup, MainScreen, IntroPopup, VictoryPopup } from './components';
import { GameComponent, GameState } from './core';
import './styles/index.css';

const app = new PIXI.Application({
  antialias: true,
  width: 1920,
  height: 1080,
  resizeTo: window,
});

const gameState = new GameState({
  timeLimit: 10000,
  cols: 4,
  rows: 4,
  itemCodes: [1, 2, 3, 4, 5, 6],
});

PIXI.Loader.shared
  // Graphics
  .add('background', 'img/background.png')
  .add('bullet', 'img/bullet.png')
  .add('panel', 'img/panel.png')
  .add('panel_micro', 'img/panel_micro.png')
  .add('fail', 'img/fail.png')
  .add('success', 'img/success.png')
  .add('overlay_tile', 'img/overlay_tile.png')
  .add('button', 'img/button.png')
  .add('button_wide', 'img/button_wide.png')
  .add('cell_1', 'img/cell_1.png')
  .add('cell_2', 'img/cell_2.png')
  .add('cell_3', 'img/cell_3.png')
  .add('cell_4', 'img/cell_4.png')
  .add('cell_5', 'img/cell_5.png')
  .add('cell_6', 'img/cell_6.png')
  // Sounds
  .add('click', 'sounds/click.mp3')
  .add('take', 'sounds/take.mp3')
  .add('merge', 'sounds/merge.mp3')
  .add('victory', 'sounds/victory.mp3')
  .add('defeat', 'sounds/defeat.mp3')
  .load(() => {
    const font = new FontFaceObserver('Chango', {});

    font.load().then(() => {
      GameComponent.bootstrap(app, gameState, [
        // Components
        new MainScreen(),
        new IntroPopup(),
        new VictoryPopup(),
        new DefeatPopup(),
      ]);

      document.body.appendChild(app.view);
    });
  });
