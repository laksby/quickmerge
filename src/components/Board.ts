import * as PIXI from 'pixi.js';
import { UIElement, UIElementOptions } from './common';

export interface BoardOptions extends UIElementOptions {
  gap: number;
}

export class Board extends UIElement<BoardOptions> {
  private cells: PIXI.Graphics[];
  private labels: PIXI.Text[];
  private dragStart?: PIXI.Point;
  private dragCell?: PIXI.Graphics;
  private dragData?: PIXI.InteractionData;
  private colWidth: number;
  private rowHeight: number;

  public start() {
    super.start();

    this.cells = [];
    this.labels = [];
    this.colWidth = (this.width - (this.state.cols - 1) * this.options.gap) / this.state.cols;
    this.rowHeight = (this.height - (this.state.rows - 1) * this.options.gap) / this.state.rows;

    for (let i = 0; i < this.state.cols; i++) {
      for (let j = 0; j < this.state.rows; j++) {
        const cell = new PIXI.Graphics();
        const label = new PIXI.Text(this.state.items[i][j] ?? '', { align: 'center', fill: 0x000000, fontSize: 24 });

        this.setCellData(cell, i, j);

        cell.name = `Cell:${i};${j}`;
        cell.x = i * (this.colWidth + this.options.gap) + this.colWidth / 2;
        cell.y = j * (this.rowHeight + this.options.gap) + this.rowHeight / 2;
        cell.pivot.set(this.colWidth / 2, this.rowHeight / 2);
        cell.beginFill(0xffffff);
        cell.drawRect(0, 0, this.colWidth, this.rowHeight);
        cell.endFill();
        cell.interactive = true;
        cell.buttonMode = true;
        cell
          .on('pointerdown', event => this.onDragStart(event, cell))
          .on('pointerup', () => this.onDragEnd())
          .on('pointerupoutside', () => this.onDragEnd())
          .on('pointermove', () => this.onDragMove());

        label.x = this.colWidth / 2;
        label.y = this.rowHeight / 2;
        label.anchor.set(0.5, 0.5);

        cell.addChild(label);

        this.cells.push(cell);
        this.labels.push(label);
        this.root.addChild(cell);
      }
    }
  }

  public update(delta: number) {
    super.update(delta);

    for (let i = 0; i < this.state.cols; i++) {
      for (let j = 0; j < this.state.rows; j++) {
        const index = j + i * this.state.cols;
        const cell = this.cells[index];
        const label = this.labels[index];
        const item = this.state.items[i][j];

        cell.visible = item !== null;
        label.text = item ?? '';
      }
    }
  }

  private onDragStart(event: PIXI.InteractionEvent, cell: PIXI.Graphics) {
    this.dragStart = cell.position.clone();
    this.dragCell = cell;
    this.dragData = event.data;
  }

  private onDragEnd() {
    if (this.dragCell && this.dragData && this.dragStart) {
      const targetPosition = this.dragData.getLocalPosition(this.dragCell.parent);
      const targetCell = this.cells.find(
        cell =>
          cell !== this.dragCell &&
          cell.visible &&
          targetPosition.x >= cell.x - this.colWidth / 2 &&
          targetPosition.y >= cell.y - this.rowHeight / 2 &&
          targetPosition.x <= cell.x + this.colWidth - this.colWidth / 2 &&
          targetPosition.y <= cell.y + this.rowHeight - this.rowHeight / 2,
      );

      if (targetCell) {
        const source = this.getCellData(this.dragCell);
        const target = this.getCellData(targetCell);
        this.state.tryMerge(source.x, source.y, target.x, target.y);
      }

      this.dragCell.x = this.dragStart.x;
      this.dragCell.y = this.dragStart.y;

      this.dragStart = undefined;
      this.dragCell = undefined;
      this.dragData = undefined;
    }
  }

  private onDragMove() {
    if (this.dragCell && this.dragData) {
      const newPosition = this.dragData.getLocalPosition(this.dragCell.parent);
      this.dragCell.x = newPosition.x;
      this.dragCell.y = newPosition.y;
    }
  }

  private setCellData(cell: PIXI.DisplayObject, x: number, y: number) {
    cell[Symbol.for('CellPosition')] = new PIXI.Point(x, y);
  }

  private getCellData(cell: PIXI.DisplayObject): PIXI.Point {
    return cell[Symbol.for('CellPosition')];
  }
}
