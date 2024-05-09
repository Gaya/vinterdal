import * as tiles from '~parts/tiles/base.ts';

import './style.css';

import { createBoardTile, TileOrientation } from '~models/tile.ts';
import { Board } from '~models/board.ts';
import { createPlayer, PlayerColor } from '~models/player.ts';

import { renderBoard } from '~view/board.ts';

function makeBoard() {
  const player = createPlayer({ color: PlayerColor.RED });

  const start = createBoardTile(
    tiles.startingTile,
    TileOrientation.S,
  );

  const below = createBoardTile(tiles.fcfcCity, TileOrientation.W);
  const above = createBoardTile(tiles.fcfcCity);
  const left = createBoardTile(tiles.ccrcCity, TileOrientation.W);

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

  return renderBoard(board);
}

function start() {
  const app = document.getElementById('app');

  if (!app) {
    return;
  }

  app.appendChild(makeBoard());
}

start();
