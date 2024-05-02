import {
  createBoardTile,
  createTile,
  getBoardTileEdge,
  TileEdge,
  TileOrientation,
} from './tile.ts';

describe('createTile', () => {
  it('creates a new city filled tile', () => {
    expect(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY]))
      .toEqual({
        edges: [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
        hasBonus: false,
        hasCloister: false,
      });
  });

  it('creates a new city filled tile with bonus', () => {
    expect(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY], { bonus: true }))
      .toEqual({
        edges: [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
        hasBonus: true,
        hasCloister: false,
      });
  });

  it('creates a field tile with a cloister', () => {
    expect(createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.FIELD], { cloister: true }))
      .toEqual({
        edges: [TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.FIELD],
        hasBonus: false,
        hasCloister: true,
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

describe('getBoardTileEdge', () => {
  const startingTile = createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]);

  it('should give back the correct edges when getting them all', () => {
    const boardTile = createBoardTile(startingTile);

    expect(getBoardTileEdge(boardTile, TileOrientation.UP)).toEqual(TileEdge.CITY);
    expect(getBoardTileEdge(boardTile, TileOrientation.RIGHT)).toEqual(TileEdge.ROAD);
    expect(getBoardTileEdge(boardTile, TileOrientation.DOWN)).toEqual(TileEdge.FIELD);
    expect(getBoardTileEdge(boardTile, TileOrientation.LEFT)).toEqual(TileEdge.ROAD);
  });

  it('should give back correct edges when turned right', () => {
    const boardTile = createBoardTile(startingTile, TileOrientation.RIGHT);

    expect(getBoardTileEdge(boardTile, TileOrientation.UP)).toEqual(TileEdge.ROAD);
    expect(getBoardTileEdge(boardTile, TileOrientation.RIGHT)).toEqual(TileEdge.CITY);
    expect(getBoardTileEdge(boardTile, TileOrientation.DOWN)).toEqual(TileEdge.ROAD);
    expect(getBoardTileEdge(boardTile, TileOrientation.LEFT)).toEqual(TileEdge.FIELD);
  });

  it('should give back correct edges when turned down', () => {
    const boardTile = createBoardTile(startingTile, TileOrientation.DOWN);

    expect(getBoardTileEdge(boardTile, TileOrientation.UP)).toEqual(TileEdge.FIELD);
    expect(getBoardTileEdge(boardTile, TileOrientation.RIGHT)).toEqual(TileEdge.ROAD);
    expect(getBoardTileEdge(boardTile, TileOrientation.DOWN)).toEqual(TileEdge.CITY);
    expect(getBoardTileEdge(boardTile, TileOrientation.LEFT)).toEqual(TileEdge.ROAD);
  });

  it('should give back correct edges when turned left', () => {
    const boardTile = createBoardTile(startingTile, TileOrientation.LEFT);

    expect(getBoardTileEdge(boardTile, TileOrientation.UP)).toEqual(TileEdge.ROAD);
    expect(getBoardTileEdge(boardTile, TileOrientation.RIGHT)).toEqual(TileEdge.FIELD);
    expect(getBoardTileEdge(boardTile, TileOrientation.DOWN)).toEqual(TileEdge.ROAD);
    expect(getBoardTileEdge(boardTile, TileOrientation.LEFT)).toEqual(TileEdge.CITY);
  });
});
