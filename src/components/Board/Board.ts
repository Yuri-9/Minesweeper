import Control from '../../common/control';
import './style.css';
import { Cell } from '../Cell/Cell';

const DEFAULT_SIZE = 10;
const DEFAULT_MINES = 10;
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export class Board extends Control {
  cells: Cell[][];

  private size: number;
  private rows: number;
  private columns: number;
  public mines: number;
  private steps: number;

  constructor(
    parentNode: HTMLElement,
    public onGameOver: (isWin: boolean, steps: number) => void,
    public onChangeMarkedMines: (minesCount: number) => void
  ) {
    super(parentNode, 'div', 'board');
    this.cells = [];
    this.steps = 0;
    this.node.addEventListener('click', (e) => {
      e.preventDefault();
    });
    this.node.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  fillMines() {
    this.rows = this.cells.length;
    this.columns = this.cells[0].length;
    let minesPlaced = 0;

    while (minesPlaced < this.size) {
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomColumn = Math.floor(Math.random() * this.columns);

      if (!this.cells[randomRow][randomColumn].hasMine) {
        this.cells[randomRow][randomColumn].setMine();
        this.addCountMinesToNeighborCell(randomRow, randomColumn);
        minesPlaced++;
      }
    }
  }

  private addCountMinesToNeighborCell(indexRow: number, indexColumn: number) {
    DIRECTIONS.forEach(([coefficientRow, coefficientColumn]) => {
      const currentCell = this.cells[indexRow + coefficientRow]?.[indexColumn + coefficientColumn];
      if (currentCell && !currentCell.hasMine) {
        this.cells[indexRow + coefficientRow][indexColumn + coefficientColumn].increaseNeighborCellCount();
      }
    });
  }

  openCell = (row: number, column: number) => {
    this.steps++;
    const cell = this.cells[row]?.[column];

    if (cell.isOpen) return;

    cell.openCell();

    if (cell.hasMine) {
      this.onGameOver(false, this.steps);
      return;
    }

    if (!this.mines && this.checkIsWin()) {
      this.onGameOver(true, this.steps);
      return;
    }

    if (cell.isEmpty()) {
      DIRECTIONS.forEach(([coefficientRow, coefficientColumn]) => {
        const newRow = row + coefficientRow;
        const newColumn = column + coefficientColumn;

        const nextCell = this.cells[newRow]?.[newColumn];

        if (nextCell && !nextCell.hasMine) {
          this.openCell(row + coefficientRow, column + coefficientColumn);
        }
      });
    }
  };

  handleOpenCell = (row: number, column: number) => {
    this.openCell(row, column);
  };

  markMine = (row: number, column: number) => {
    const cell = this.cells[row]?.[column];

    if (this.mines && !cell.isOpen) {
      cell.markMine();
      this.mines = cell.hasFlag ? this.mines - 1 : this.mines + 1;
      this.onChangeMarkedMines(this.mines);
      if (!this.mines && this.checkIsWin()) {
        this.onGameOver(true, this.steps);
        return;
      }
    } else {
      this.openCell(row, column);
    }
  };

  handleMarkMine = (e: MouseEvent | KeyboardEvent, row: number, column: number) => {
    this.steps++;
    e.preventDefault();
    this.markMine(row, column);
  };

  checkIsWin(): boolean {
    let openedCells = 0;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const cell = this.cells[i]?.[j];
        if (!cell.isOpen && !cell.hasFlag) {
          openedCells++;
        }
      }
    }

    return !openedCells;
  }

  openBoard() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i]?.[j].openCell(true);
      }
    }
  }

  private handleMoveFocus = (newRow: number, newColumn: number) => {
    const cell = this.cells[newRow]?.[newColumn];
    cell && cell.node.focus();
  };

  create(size = DEFAULT_SIZE, mines = DEFAULT_MINES) {
    this.size = size;
    this.mines = mines;
    for (let i = 0; i < size; i++) {
      const row = new Control(this.node, 'div', 'board_row');
      this.cells[i] = [];
      for (let j = 0; j < size; j++) {
        const cell = new Cell(row.node, i, j, this.handleOpenCell, this.handleMarkMine, this.handleMoveFocus);

        this.cells[i].push(cell);
      }
    }
  }
}
