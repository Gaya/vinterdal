import {
  Board,
  canConnectTiles,
  canPlaceTile,
  getTilePlacementFromBoard,
  placeTile,
} from './board.ts';
import {
  ClaimLocation, ClaimType,
  createBoardTile,
  createTile,
  TileEdge,
  TileMiddle,
  TileOrientation,
} from './tile.ts';
import { createPlayer, PlayerColor } from '~models/player.ts';

const startingTile = createBoardTile(
  createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
  TileOrientation.UP,
);

const standardBoard: Board = {
  ['0:0']: {
    tile: startingTile,
  },
};

describe('getTilePlacementFromBoard', () => {
  it('should be able to get the starting tile from the starting board', () => {
    expect(getTilePlacementFromBoard(standardBoard, [0, 0])).toStrictEqual({ tile: startingTile });
  });

  it('should get nothing from an empty place on the starting board', () => {
    expect(getTilePlacementFromBoard(standardBoard, [1, 1])).toBe(undefined);
  });

  it('should be able to get a tile from a coordinate', () => {
    const otherBoard: Board = {
      ['23:45']: {
        tile: startingTile,
      },
    };

    expect(getTilePlacementFromBoard(otherBoard, [23, 45])).toStrictEqual({ tile: startingTile });
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

  it('should be able to place a turned starting tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD]),
      TileOrientation.DOWN,
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

  it('should not be able to place a tile on top of another', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.RIGHT,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, 0])).toEqual(false);
  });

  it('should be to handle a complex situation', () => {
    const belowTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.RIGHT,
    );

    const rightTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.LEFT,
    );

    const complexBoard: Board = {
      ['0:0']: {
        tile: startingTile,
      },
      ['1:-1']: {
        tile: rightTile,
      },
      ['0:-2']: {
        tile: belowTile,
      },
      ['-1:-1']: {
        tile: startingTile,
      },
    };

    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.CITY]),
      TileOrientation.DOWN,
    );

    expect(canPlaceTile(complexBoard, turnedTile, [0, -1])).toEqual(true);
  });
});

describe('placeTile', () => {
  it('should be able to place a new tile on the board', () => {
    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY]),
      TileOrientation.LEFT,
    );

    expect(placeTile(standardBoard, turnedTile, [1, 0]))
      .toEqual({
        ['0:0']: { tile: startingTile },
        ['1:0']: { tile: turnedTile },
      });
  });

  it('should not be able to place a new tile an existing tile', () => {
    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY]),
      TileOrientation.LEFT,
    );

    expect(() => {
      placeTile(standardBoard, turnedTile, [0, 0]);
    }).toThrow(Error);
  });

  it('should not be able to place impossible connection', () => {
    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD]),
      TileOrientation.LEFT,
    );

    expect(() => {
      placeTile(standardBoard, turnedTile, [0, 1]);
    }).toThrow(Error);
  });

  it('should be able to claim tile', () => {
    const player = createPlayer({ color: PlayerColor.RED });
    const claimed = { player, location: ClaimLocation.N };
    const turnedTile = createBoardTile(
      createTile(
        [TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
        TileMiddle.FIELD,
        {
          [ClaimLocation.N]: ClaimType.ROAD,
        },
      ),
      TileOrientation.LEFT,
    );

    expect(placeTile(standardBoard, turnedTile, [1, 0], claimed))
      .toEqual({
        ['0:0']: { tile: startingTile },
        ['1:0']: { tile: turnedTile, claimed },
      });
  });

  it('should not be able to claim tile when there is no location to be claimed', () => {
    const player = createPlayer({ color: PlayerColor.RED });
    const claimed = { player, location: ClaimLocation.N };
    const turnedTile = createBoardTile(
      createTile(
        [TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
        TileMiddle.FIELD,
        {
          [ClaimLocation.S]: ClaimType.ROAD,
        },
      ),
      TileOrientation.LEFT,
    );

    expect(() => {
      placeTile(standardBoard, turnedTile, [1, 0], claimed);
    }).toThrow(Error);
  });
});
