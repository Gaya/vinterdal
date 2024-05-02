export enum TileEdge {
  CITY = 'CITY',
  ROAD = 'ROAD',
  FIELD = 'FIELD',
}

export interface Tile {
  edges: [TileEdge, TileEdge, TileEdge, TileEdge];
  hasBonus?: boolean;
  hasCloister?: boolean;
}

export enum TileOrientation {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
}

export interface BoardTile {
  orientation: TileOrientation;
  tile: Tile;
}

export interface BoardNeighbours {
  n?: BoardTile;
  e?: BoardTile;
  s?: BoardTile;
  w?: BoardTile;
}

export function createTile(
  edges: Tile['edges'],
  extraProperties: Partial<{ bonus: boolean; cloister: boolean; }> = {},
): Tile {
  return {
    edges,
    hasBonus: !!extraProperties.bonus,
    hasCloister: !!extraProperties.cloister,
  };
}

export function createBoardTile(
  tile: Tile,
  orientation: TileOrientation = TileOrientation.UP,
): BoardTile {
  return {
    orientation,
    tile,
  };
}

export function offsetByOrientation(orientation: TileOrientation) {
  switch (orientation) {
    case TileOrientation.RIGHT:
      return 1;
    case TileOrientation.DOWN:
      return 2;
    case TileOrientation.LEFT:
      return 3;
    default:
    case TileOrientation.UP:
      return 0;
  }
}

export function getBoardTileEdge(tile: BoardTile, tileSide: TileOrientation): TileEdge {
  const tileOffset = offsetByOrientation(tileSide);
  const orientationOffset = offsetByOrientation(tile.orientation);
  const index = tileOffset - orientationOffset;

  return tile.tile.edges[index < 0 ? 4 + index : index];
}
