import {
  ClaimLocation,
  ClaimType,
  createBoardTile,
  createTile,
  getBoardTileEdge,
  TileEdge,
  TileMiddle,
  TileOrientation,
} from './tile.ts';

describe('createTile', () => {
  it('creates a new city filled tile', () => {
    expect(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY]))
      .toEqual({
        edges: [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
        middle: TileMiddle.FIELD,
        claimOptions: {},
        hasBonus: false,
      });
  });

  it('creates a new city filled tile with bonus', () => {
    expect(createTile([TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY], TileMiddle.FIELD, {}, { bonus: true }))
      .toEqual({
        edges: [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
        middle: TileMiddle.FIELD,
        claimOptions: {},
        hasBonus: true,
      });
  });

  it('creates a field tile with a farm', () => {
    expect(createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.FIELD], TileMiddle.FARM))
      .toEqual({
        edges: [TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.FIELD],
        middle: TileMiddle.FARM,
        claimOptions: {},
        hasBonus: false,
      });
  });

  it('creates a tile with farm and road', () => {
    const tile = createTile(
      [TileEdge.FIELD, TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD],
      TileMiddle.FARM,
      {
        [ClaimLocation.C]: ClaimType.FARM,
        [ClaimLocation.S]: ClaimType.ROAD,
      },
    );

    expect(tile)
      .toEqual({
        edges: [TileEdge.FIELD, TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD],
        middle: TileMiddle.FARM,
        claimOptions: {
          [ClaimLocation.C]: ClaimType.FARM,
          [ClaimLocation.S]: ClaimType.ROAD,
        },
        hasBonus: false,
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
