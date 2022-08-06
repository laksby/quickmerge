import * as PIXI from 'pixi.js';
import { DefeatPopup, MainScreen, IntroPopup, VictoryPopup } from './components';
import { GameComponent, GameState } from './core';
import './styles/index.css';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  resizeTo: window,
});

const gameState = new GameState({
  timeLimit: 10000,
  cols: 4,
  rows: 4,
  itemCodes: [1, 2, 3, 4],
});

GameComponent.bootstrap(app, gameState, [
  // Components
  new MainScreen(4, 4),
  new IntroPopup(),
  new VictoryPopup(),
  new DefeatPopup(),
]);

document.body.appendChild(app.view);
