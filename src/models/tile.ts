export enum TileEdge {
  CITY = 1,
  ROAD = 2,
  FIELD = 3,
}

export interface Tile {
  edges: [TileEdge, TileEdge, TileEdge, TileEdge];
  hasBonus?: boolean;
  hasCloister?: boolean;
}

export enum TileOrientation {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
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

  return tile.tile.edges[(tileOffset + orientationOffset) % 4];
}
