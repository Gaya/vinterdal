import { BoardTile, getBoardTileEdge, offsetByOrientation, TileOrientation } from './tile.ts';
import { Player } from './player.ts';

interface BoardPlacement {
  claimed?: Player;
  tile: BoardTile;
}

type BoardPosition = [number, number];

export type Board = Record<string, BoardPlacement>;

export function getTileFromBoard(
  board: Board,
  position: BoardPosition,
): BoardPlacement | undefined {
  return board[position.join(':')];
}

export function canConnectTiles(tileA: BoardTile, tileB: BoardTile, tileEdge: TileOrientation) {
  const oppositeEdge = (offsetByOrientation(tileEdge) + 2) % 4;
  const edgeA = getBoardTileEdge(tileA, tileEdge);
  const edgeB = getBoardTileEdge(tileB, oppositeEdge);

  return edgeA === edgeB;
}

export function canPlaceTile(board: Board, tile: BoardTile, position: BoardPosition): boolean {
  if (getTileFromBoard(board, position)) {
    return false;
  }

  return false;
}

export function placeTile(currentBoard: Board, tile: BoardTile, position: BoardPosition): Board {
  if (!canPlaceTile(currentBoard, tile, position)) {
    throw new Error('Tile cannot be placed.');
  }

  const newBoard = { ...currentBoard };

  return newBoard;
}
