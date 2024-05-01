export enum TileEdge {
  CITY = 1,
  ROAD = 2,
  FIELD = 3,
}

export interface Tile {
  edges: [TileEdge, TileEdge, TileEdge, TileEdge];
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

export function createTile(edges: Tile['edges']): Tile {
  return {
    edges,
  };
}

export function createBoardTile(tile: Tile, orientation: TileOrientation = TileOrientation.UP): BoardTile {
  return {
    orientation,
    tile,
  };
}
