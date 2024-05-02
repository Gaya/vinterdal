import { Board, canConnectTiles, canPlaceTile, getTileFromBoard } from './board.ts';
import { createBoardTile, createTile, TileEdge, TileOrientation } from './tile.ts';

const startingTile = createBoardTile(
  createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
  TileOrientation.UP,
);

const standardBoard: Board = {
  ['0:0']: {
    tile: startingTile,
  },
};

describe('getTileFromBoard', () => {
  it('should be able to get the starting tile from the starting board', () => {
    expect(getTileFromBoard(standardBoard, [0, 0])).toStrictEqual({ tile: startingTile });
  });

  it('should get nothing from an empty place on the starting board', () => {
    expect(getTileFromBoard(standardBoard, [1, 1])).toBe(undefined);
  });

  it('should be able to get a tile from a coordinate', () => {
    const otherBoard: Board = {
      ['23:45']: {
        tile: startingTile,
      },
    };

    expect(getTileFromBoard(otherBoard, [23, 45])).toStrictEqual({ tile: startingTile });
  });
});

describe('canConnectTiles', () => {
  it('should be able to connect two road edges', () => {
    const startingTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.UP,
    );

    expect(canConnectTiles(startingTile, startingTile, TileOrientation.LEFT)).toEqual(true);
    expect(canConnectTiles(startingTile, startingTile, TileOrientation.RIGHT)).toEqual(true);
  });

  it('should not be able to connect city and field edges', () => {
    const startingTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.UP,
    );

    expect(canConnectTiles(startingTile, startingTile, TileOrientation.UP)).toEqual(false);
    expect(canConnectTiles(startingTile, startingTile, TileOrientation.DOWN)).toEqual(false);
  });
});

describe('canPlaceTile', () => {
  it('should be able to place a field tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD]),
      TileOrientation.UP,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(true);
  });

  it('should be able to place a field and road tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.UP,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(true);
  });

  it('should not be able to place a turned field and road tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.RIGHT,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(false);
  });
});
