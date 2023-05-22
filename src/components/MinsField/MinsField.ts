import './style.css';
import Control from '../../common/control';
import { getThreeCharacters } from '../../utils/getThreeCharacters';

export class MinsField extends Control {
  constructor(parentNode: HTMLElement, private minsCount: number) {
    super(parentNode, 'div', 'mins');
  }

  public render(minesCount: number) {
    this.setContent(getThreeCharacters(minesCount));
  }
}
