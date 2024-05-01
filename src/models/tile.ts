export enum TileEdge {
  CITY = 1,
  ROAD = 2,
  FIELD = 3,
}

export interface Tile {
  edges: [TileEdge, TileEdge, TileEdge, TileEdge];
}

export interface BoardTile {
  orientation: 0| 1 | 2 | 3;
  tile: Tile;
}

export interface BoardNeighbours {
  n?: BoardTile;
  e?: BoardTile;
  s?: BoardTile;
  w?: BoardTile;
}
