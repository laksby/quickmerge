import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import { UIElement, UIElementOptions } from './common';
import { ParticleExplosion } from './ParticleExplosion';

export interface BoardOptions extends UIElementOptions {
  gap: number;
}

export class Board extends UIElement<BoardOptions> {
  private cells: PIXI.Sprite[];
  private mergeExplosion: ParticleExplosion;
  private dragStart?: PIXI.Point;
  private dragCell?: PIXI.Sprite;
  private dragData?: PIXI.InteractionData;
  private colWidth: number;
  private rowHeight: number;

  public start() {
    super.start();

    this.cells = [];
    this.colWidth = (this.width - (this.state.cols - 1) * this.options.gap) / this.state.cols;
    this.rowHeight = (this.height - (this.state.rows - 1) * this.options.gap) / this.state.rows;

    this.mergeExplosion = new ParticleExplosion();
    this.addChildren(this.mergeExplosion);

    this.root.sortableChildren = true;

    for (let i = 0; i < this.state.cols; i++) {
      for (let j = 0; j < this.state.rows; j++) {
        const texture = this.resource(`cell_${this.state.items[i][j]}`).texture as PIXI.Texture;
        const cell = new PIXI.Sprite(texture);

        this.setCellData(cell, i, j);

        cell.name = `Cell:${i};${j}`;
        cell.x = i * (this.colWidth + this.options.gap) + this.colWidth / 2;
        cell.y = j * (this.rowHeight + this.options.gap) + this.rowHeight / 2;
        cell.anchor.set(0.5, 0.5);
        cell.width = this.colWidth;
        cell.height = this.rowHeight;
        cell.interactive = true;
        cell.buttonMode = true;
        cell
          .on('pointerdown', event => this.onDragStart(event, cell))
          .on('pointerup', () => this.onDragEnd())
          .on('pointerupoutside', () => this.onDragEnd())
          .on('pointermove', () => this.onDragMove());

        cell.zIndex = 1;

        this.cells.push(cell);
        this.root.addChild(cell);
      }
    }
  }

  public update(delta: number) {
    super.update(delta);

    for (let i = 0; i < this.state.cols; i++) {
      for (let j = 0; j < this.state.rows; j++) {
        const cell = this.cells[j + i * this.state.cols];
        const item = this.state.items[i][j];

        cell.visible = item !== null;

        if (item !== null) {
          const texture = this.resource(`cell_${item}`).texture as PIXI.Texture;
          cell.texture = texture;
        }
      }
    }
  }

  private onDragStart(event: PIXI.InteractionEvent, cell: PIXI.Sprite) {
    this.dragStart = cell.position.clone();
    this.dragCell = cell;
    this.dragData = event.data;
    this.dragCell.zIndex = 2;
    sound.play('take');
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
        const merged = this.state.tryMerge(source.x, source.y, target.x, target.y);

        if (merged) {
          this.mergeExplosion.emit(targetPosition.x, targetPosition.y);
          sound.play('merge');
        }
      }

      this.dragCell.x = this.dragStart.x;
      this.dragCell.y = this.dragStart.y;
      this.dragCell.zIndex = 1;

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
