import * as PIXI from 'pixi.js';
import { GameState } from './state';
import './styles/index.css';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  resizeTo: window,
});

const gameState = new GameState();

document.body.appendChild(app.view);
