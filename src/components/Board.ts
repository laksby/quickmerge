import { GameComponent } from '../core';
import * as PIXI from 'pixi.js';

export class Board extends GameComponent {
  private cols = 4;
  private rows = 4;
  private colWidth = 80;
  private rowHeight = 80;
  private gap = 16;
  private cells: PIXI.Graphics[];

  public start() {
    this.cells = [];

    const totalWidth = this.cols * this.colWidth + (this.cols - 1) * this.gap;
    const totalHeight = this.rows * this.rowHeight + (this.rows - 1) * this.gap;

    this.root.x = (this.view.width - totalWidth) / 2;
    this.root.y = (this.view.height - totalHeight) / 2;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const cell = new PIXI.Graphics();

        cell.x = i * (this.colWidth + this.gap);
        cell.y = j * (this.rowHeight + this.gap);
        cell.beginFill(0xffffff);
        cell.drawRect(0, 0, this.colWidth, this.rowHeight);
        cell.endFill();
        cell.interactive = true;
        cell.buttonMode = true;
        cell.on('pointerdown', () => this.onCellClick());

        this.cells.push(cell);
        this.root.addChild(cell);
      }
    }
  }

  private onCellClick() {
    this.state.tryMerge();
  }
}
