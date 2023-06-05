import './style.css';
import Control from '../../common/control';

const NUMBERS_COLOR: { [key: string]: string } = {
  1: '#0000fa',
  2: '#4b802d',
  3: '#db1300',
  4: '#202081',
  5: '#202081',
  6: '#202081',
  7: '#202081',
  8: '#202081',
};

export class Cell extends Control {
  public isOpen: boolean;
  public hasMine: boolean;
  public hasFlag: boolean;

  public neighborCellsCount = 0;

  constructor(
    parentNode: HTMLElement,
    public row: number,
    public column: number,
    public onOpen: (row: number, column: number) => void,
    public onMarkMine: (e: MouseEvent | KeyboardEvent, row: number, column: number) => void,
    public onMoveFocus: (newRow: number, newColumn: number) => void
  ) {
    super(parentNode, 'button', 'cell');

    this.init();
    this.isOpen = false;
    this.hasMine = false;
    this.hasFlag = false;
    this.onOpen = onOpen;
  }

  checkIsOpen(): boolean {
    if (this.isOpen) return true;
    this.isOpen = true;
    return false;
  }

  increaseNeighborCellCount() {
    this.neighborCellsCount++;
  }

  isEmpty() {
    return !this.hasMine && !this.neighborCellsCount;
  }

  setMine() {
    this.hasMine = true;
    this.neighborCellsCount = 0;
    this.setContent('');
    // this.node.classList.add('has-mine');
  }

  openCell(shouldOpen = false) {
    if (!shouldOpen && this.hasFlag) return;
    this.isOpen = true;

    this.node.classList.add('open');
    if (this.neighborCellsCount) {
      this.setContent(this.neighborCellsCount.toString());
      this.node.style.color = NUMBERS_COLOR[this.neighborCellsCount];
    }
    if (this.hasMine) {
      this.node.classList.add('has-mine');
    }
  }

  markMine() {
    if (this.isOpen) {
      return;
    }
    this.hasFlag = !this.hasFlag;
    if (this.hasFlag) {
      this.node.classList.add('has-flag');
    } else {
      this.node.classList.remove('has-flag');
    }
  }

  private keydownHandler = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Space':
        this.onMarkMine(e, this.row, this.column);
        break;
      case 'ArrowRight':
        this.onMoveFocus(this.row, this.column + 1);
        break;
      case 'ArrowLeft':
        this.onMoveFocus(this.row, this.column - 1);
        break;
      case 'ArrowUp':
        this.onMoveFocus(this.row - 1, this.column);
        break;
      case 'ArrowDown':
        this.onMoveFocus(this.row + 1, this.column);
        break;

      default:
        break;
    }
  };

  init() {
    this.node.addEventListener('click', () => this.onOpen(this.row, this.column));
    this.node.addEventListener('keydown', this.keydownHandler);
    this.node.addEventListener('contextmenu', (e) => this.onMarkMine(e, this.row, this.column));
  }
}
