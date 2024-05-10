import { BoardTile, ClaimLocation, getBoardTileEdge, TileOrientation } from './tile.ts';
import { Player } from './player.ts';

interface BoardTileClaim {
  player: Player;
  location: ClaimLocation;
}

interface BoardPlacement {
  claimed?: BoardTileClaim;
  boardTile: BoardTile;
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
    case TileOrientation.E:
      return TileOrientation.W;
    case TileOrientation.S:
      return TileOrientation.N;
    case TileOrientation.W:
      return TileOrientation.E;
    default:
    case TileOrientation.N:
      return TileOrientation.S;
  }
}

export function canConnectTiles(tileA: BoardTile, tileB: BoardTile, tileEdge: TileOrientation) {
  const edgeA = getBoardTileEdge(tileA, tileEdge);
  const edgeB = getBoardTileEdge(tileB, oppositeOrientation(tileEdge));

  return edgeA === edgeB;
}

function getPositionOffset(orientation: TileOrientation): [number, number] {
  switch (orientation) {
    case TileOrientation.E:
      return [1, 0];
    case TileOrientation.S:
      return [0, -1];
    case TileOrientation.W:
      return [-1, 0];
    default:
    case TileOrientation.N:
      return [0, 1];
  }
}

export function canPlaceTile(board: Board, tile: BoardTile, position: BoardPosition): boolean {
  if (getTilePlacementFromBoard(board, position)) {
    return false;
  }

  return [TileOrientation.N, TileOrientation.E, TileOrientation.S, TileOrientation.W]
    .every((orientation) => {
      const [x, y] = position;
      const [dx, dy] = getPositionOffset(orientation);
      const comparingTilePlacement = getTilePlacementFromBoard(board, [x + dx, y + dy]);

      if (comparingTilePlacement) {
        return canConnectTiles(tile, comparingTilePlacement.boardTile, orientation);
      }

      return true;
    });
}

export function placeTile(
  currentBoard: Board,
  boardTile: BoardTile,
  position: BoardPosition,
  claimed?: BoardTileClaim,
): Board {
  if (!canPlaceTile(currentBoard, boardTile, position)) {
    throw new Error('Tile cannot be placed.');
  }

  if (claimed && !boardTile.tile.claimOptions[claimed.location]) {
    throw new Error('Tile cannot be claimed.');
  }

  return {
    ...currentBoard,
    [position.join(':')]: { boardTile, claimed },
  };
}
