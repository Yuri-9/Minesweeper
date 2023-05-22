import './style.css';
import Control from '../../common/control';
import { MinsField } from '../MinsField/MinsField';
import { TimerField } from '../TimerField/TimerField';

export class Menu extends Control {
  public minsField: MinsField;
  public timerField: TimerField;
  public resetButton: Control;

  constructor(parentNode: HTMLElement, onReset: () => void) {
    super(parentNode, 'div', 'menu');
    this.minsField = new MinsField(this.node, 10);

    this.resetButton = new Control(this.node, 'button', 'menu_button-reset', 'reset');
    this.resetButton.node.addEventListener('click', onReset);

    this.timerField = new TimerField(this.node);
  }
}
