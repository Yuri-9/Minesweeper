import './style.css';
import Control from '../../common/control';
import { getThreeCharacters } from '../../utils/getThreeCharacters';

export class TimerField extends Control {
  public seconds: number;
  public timerId: ReturnType<typeof setInterval> | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'mins');
    this.seconds = 0;
    this.show();
  }

  start() {
    console.log('start');

    this.timerId = setInterval(() => {
      this.seconds = this.seconds + 1;
      this.show();
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  reset() {
    this.seconds = 0;
    this.show();
  }

  show() {
    this.setContent(getThreeCharacters(this.seconds));
  }
}
