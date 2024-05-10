import * as tiles from '~parts/tiles/base.ts';

import './style.css';

import { ClaimLocation, createBoardTile, TileOrientation } from '~models/tile.ts';
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
      boardTile: start,
    },
    ['-1:0']: {
      boardTile: left,
      claimed: {
        player,
        location: ClaimLocation.S,
      },
    },
    ['0:1']: {
      boardTile: below,
      claimed: {
        player,
        location: ClaimLocation.C,
      },
    },
    ['0:-1']: {
      boardTile: above,
      claimed: {
        player,
        location: ClaimLocation.N,
      },
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
