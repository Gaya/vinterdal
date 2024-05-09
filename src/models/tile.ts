export enum TileEdge {
  CITY = 'CITY',
  ROAD = 'ROAD',
  FIELD = 'FIELD',
}

export enum TileMiddle {
  CITY = 'CITY',
  FARM = 'FARM',
  FIELD = 'FIELD',
}

export enum ClaimType {
  CITY = 'CITY',
  FARM = 'FARM',
  FIELD = 'FIELD',
  ROAD = 'ROAD',
}

export enum ClaimLocation {
  C = 'C',
  N = 'N',
  NE = 'NE',
  E = 'E',
  SE = 'SE',
  S = 'S',
  SW = 'SW',
  W = 'W',
  NW = 'NW',
}

type ClaimOptions = Partial<Record<ClaimLocation, ClaimType>>;

export interface Tile {
  edges: [TileEdge, TileEdge, TileEdge, TileEdge];
  claimOptions: ClaimOptions;
  middle: TileMiddle,
  hasBonus?: boolean;
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

export function createTile(
  edges: Tile['edges'],
  middle: TileMiddle = TileMiddle.FIELD,
  claimOptions: ClaimOptions = {},
  extraProperties: Partial<{
    bonus: boolean;
  }> = {},
): Tile {
  return {
    edges,
    middle,
    claimOptions,
    hasBonus: !!extraProperties.bonus,
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

export function createTiles(
  tile: Tile,
  amount: number,
): Tile[] {
  return Array(amount).fill(tile);
}
