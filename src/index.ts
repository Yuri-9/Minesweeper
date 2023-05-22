// async function init() {
//   document.body.appendChild(app.view as HTMLCanvasElement);
//   const resources = new Resources();
//   console.log("loading...");
//   await resources.load();
//   console.log("loaded");
//   app.resizeTo = document.body;
//   window.addEventListener("resize", () => {
//     //app.resize();
//   });
//   const background = new Sprite(resources.background);
//   background.anchor.set(0.5, 0.5);
//   background.position.set(app.screen.width / 2, app.screen.height / 2);
//   app.stage.addChild(background);
//   const model = new GameModel();
//   const gameField = new GameField(app, model, resources);

//   model.onWin = (sign, data) => {
//     const winMessage = new WinMessage(app, sign);
//     gameField.setWinData(data).then(() => {
//       winMessage.onPlayAgain = () => {
//         winMessage.onPlayAgain = null;
//         winMessage.destroy();
//         model.start();
//         gameField.reset();
//       };
//     });
//   };

//   model.onChange = (pos) => {
//     gameField.update(pos);
//   };
// }

// init();

import "./style.css";
import { App } from "./app";

window.onload = () => {
  const root = document.body;

  if (!root) throw Error("App root element not found");

  const app = new App(root);

  app.init();
};
