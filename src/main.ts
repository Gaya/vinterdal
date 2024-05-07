import { ccrcCity, fcfcCity, startingTile } from '~parts/tiles/base.ts';

import './style.css';

import { createBoardTile, TileOrientation } from '~models/tile.ts';
import { Board } from '~models/board.ts';
import { renderBoard } from '~view/board.ts';

function start() {
  const app = document.getElementById('app');

  if (!app) {
    return;
  }

  const start = createBoardTile(
    startingTile,
    TileOrientation.DOWN,
  );

  const below = createBoardTile(fcfcCity, TileOrientation.LEFT);
  const above = createBoardTile(fcfcCity);
  const left = createBoardTile(ccrcCity, TileOrientation.LEFT);

  const board: Board = {
    ['0:0']: {
      tile: start,
    },
    ['-1:0']: {
      tile: left,
    },
    ['0:1']: {
      tile: below,
    },
    ['0:-1']: {
      tile: above,
    },
  };

  app.appendChild(renderBoard(board));
}

start();
