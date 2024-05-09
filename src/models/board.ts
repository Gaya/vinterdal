import { BoardTile, ClaimLocation, getBoardTileEdge, TileOrientation } from './tile.ts';
import { Player } from './player.ts';

interface BoardTileClaim {
  player: Player;
  location: ClaimLocation;
}

interface BoardPlacement {
  claimed?: BoardTileClaim;
  tile: BoardTile;
}

type BoardPosition = [number, number];

export type Board = Record<string, BoardPlacement>;

export function getTilePlacementFromBoard(
  board: Board,
  position: BoardPosition,
): BoardPlacement | undefined {
  return board[position.join(':')];
}

function oppositeOrientation(orientation: TileOrientation): TileOrientation {
  switch (orientation) {
    case TileOrientation.RIGHT:
      return TileOrientation.LEFT;
    case TileOrientation.DOWN:
      return TileOrientation.UP;
    case TileOrientation.LEFT:
      return TileOrientation.RIGHT;
    default:
    case TileOrientation.UP:
      return TileOrientation.DOWN;
  }
}

export function canConnectTiles(tileA: BoardTile, tileB: BoardTile, tileEdge: TileOrientation) {
  const edgeA = getBoardTileEdge(tileA, tileEdge);
  const edgeB = getBoardTileEdge(tileB, oppositeOrientation(tileEdge));

  return edgeA === edgeB;
}

function getPositionOffset(orientation: TileOrientation): [number, number] {
  switch (orientation) {
    case TileOrientation.RIGHT:
      return [1, 0];
    case TileOrientation.DOWN:
      return [0, -1];
    case TileOrientation.LEFT:
      return [-1, 0];
    default:
    case TileOrientation.UP:
      return [0, 1];
  }
}

export function canPlaceTile(board: Board, tile: BoardTile, position: BoardPosition): boolean {
  if (getTilePlacementFromBoard(board, position)) {
    return false;
  }

  return [TileOrientation.UP, TileOrientation.RIGHT, TileOrientation.DOWN, TileOrientation.LEFT]
    .every((orientation) => {
      const [x, y] = position;
      const [dx, dy] = getPositionOffset(orientation);
      const comparingTilePlacement = getTilePlacementFromBoard(board, [x + dx, y + dy]);

      if (comparingTilePlacement) {
        return canConnectTiles(tile, comparingTilePlacement.tile, orientation);
      }

      return true;
    });
}

export function placeTile(
  currentBoard: Board,
  tile: BoardTile,
  position: BoardPosition,
  claimed?: BoardTileClaim,
): Board {
  if (!canPlaceTile(currentBoard, tile, position)) {
    throw new Error('Tile cannot be placed.');
  }

  if (claimed && !tile.tile.claimOptions[claimed.location]) {
    throw new Error('Tile cannot be claimed.');
  }

  return {
    ...currentBoard,
    [position.join(':')]: { tile, claimed },
  };
}
