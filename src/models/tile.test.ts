import { createBoardTile, createTile, TileEdge, TileOrientation } from '~models/tile.ts';

describe('createTile', () => {
  it('creates a new city filled tile', () => {
    expect(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY]))
      .toEqual({
        edges: [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
      });
  });
});

describe('createBoardTile', () => {
  it('creates a new city filled tile', () => {
    expect(createBoardTile(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY])))
      .toEqual({
        orientation: TileOrientation.UP,
        tile: createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY]),
      });
  });
});
