import * as PIXI from 'pixi.js';
import { Board, DefeatPopup, IntroPopup, ScoreBar, TimingBar, VictoryPopup } from './components';
import { GameComponent, GameState } from './core';
import './styles/index.css';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  resizeTo: window,
});

const gameState = new GameState({
  timeLimit: 5000,
});

GameComponent.bootstrap(app, gameState, [
  new ScoreBar(),
  new Board(),
  new TimingBar(),
  new IntroPopup(),
  new VictoryPopup(),
  new DefeatPopup(),
]);

document.body.appendChild(app.view);
