import { createBoardTile, createTile, TileEdge, TileOrientation } from './tile.ts';

describe('createTile', () => {
  it('creates a new city filled tile', () => {
    expect(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY]))
      .toEqual({
        edges: [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
      });
  });
});

describe('createBoardTile', () => {
  const cityTile = createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY]);

  it('creates a new city filled tile', () => {
    expect(createBoardTile(cityTile))
      .toEqual({
        orientation: TileOrientation.UP,
        tile: cityTile,
      });
  });

  it('creates a new city filled tile with orientation', () => {
    expect(createBoardTile(cityTile, TileOrientation.DOWN))
      .toEqual({
        orientation: TileOrientation.DOWN,
        tile: cityTile,
      });
  });
});
