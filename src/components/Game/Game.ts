import { Board } from '../Board/Board';
import { Menu } from '../Menu/Menu';

export class Game {
  private board: Board;
  private menu: Menu;
  private parentNode: HTMLElement;

  private isPlayGame: boolean;
  private startGameHandler: () => void;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;
    this.menu = new Menu(parentNode, () => this.reset());
  }

  init() {
    this.board = new Board(this.parentNode, this.gameOver, this.handleChangeMarkedMines);
    this.startGameHandler = () => {
      this.start();
    };
    this.board.node.addEventListener('click', this.startGameHandler);
    this.board.create(10, 10);
    this.menu.minsField.render(this.board.mines);
    this.board.fillMines();
  }

  handleChangeMarkedMines = (minesCount: number) => {
    this.menu.minsField.render(minesCount);
  };

  start() {
    if (!this.isPlayGame) {
      this.isPlayGame = true;
      this.menu.timerField.start();
    }
  }

  reset() {
    this.isPlayGame = false;
    this.board.destroy();
    removeEventListener('click', this.startGameHandler);
    this.menu.timerField.stop();
    this.menu.timerField.reset();
    this.menu.resetButton.setContent('game');
    this.init();
  }

  gameOver = (isWin: boolean, steps: number) => {
    console.log('isWin', isWin, steps);
    this.board.openBoard();
    if (isWin) {
      this.menu.resetButton.setContent('win');
    } else {
      this.menu.resetButton.setContent('fail');
    }

    this.menu.timerField.stop();
  };
}
