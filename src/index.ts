import * as PIXI from 'pixi.js';
import { TimingBar } from './components';
import { Component } from './core';
import { GameState } from './state';
import './styles/index.css';

const app = new PIXI.Application({
  width: 1920,
  height: 1080,
  resizeTo: window,
});

const gameState = new GameState({
  timeStep: 50,
  timeLimit: 5000,
});

Component.bootstrap(app, gameState, [new TimingBar()]);

document.body.appendChild(app.view);

gameState.startGame();
