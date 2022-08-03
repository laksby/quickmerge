import { makeAutoObservable } from 'mobx';

export class GameState {
  constructor() {
    makeAutoObservable(this);
  }
}
