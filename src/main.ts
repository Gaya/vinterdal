import { ccrcCity, fcfcCity, startingTile } from '~parts/tiles/base.ts';

import './style.css';

import { createBoardTile, TileEdge, TileOrientation } from '~models/tile.ts';
import { Board } from '~models/board.ts';
import { createPlayer, PlayerColor } from '~models/player.ts';

import { renderBoard } from '~view/board.ts';

function start() {
  const app = document.getElementById('app');

  if (!app) {
    return;
  }

  const player = createPlayer({ color: PlayerColor.RED });

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
      claimed: {
        player,
        type: TileEdge.ROAD,
        orientation: TileOrientation.DOWN,
      },
    },
    ['0:1']: {
      tile: below,
      claimed: {
        player,
        type: TileEdge.CITY,
        orientation: TileOrientation.RIGHT,
      },
    },
    ['0:-1']: {
      tile: above,
      claimed: {
        player,
        type: TileEdge.FIELD,
        orientation: TileOrientation.UP,
      },
    },
  };

  app.appendChild(renderBoard(board));
}

start();
