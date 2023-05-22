import { Game } from './components/Game/Game';

export class App {
  private game: Game;

  constructor(parentNode: HTMLElement) {
    this.game = new Game(parentNode);
  }

  init() {
    this.game.init();
  }
}
