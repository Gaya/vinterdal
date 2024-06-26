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
  TileOrientation.N,
);

const standardBoard: Board = {
  ['0:0']: {
    boardTile: startingTile,
  },
};

describe('getTilePlacementFromBoard', () => {
  it('should be able to get the starting tile from the starting board', () => {
    expect(getTilePlacementFromBoard(standardBoard, [0, 0])).toStrictEqual({ boardTile: startingTile });
  });

  it('should get nothing from an empty place on the starting board', () => {
    expect(getTilePlacementFromBoard(standardBoard, [1, 1])).toBe(undefined);
  });

  it('should be able to get a tile from a coordinate', () => {
    const otherBoard: Board = {
      ['23:45']: {
        boardTile: startingTile,
      },
    };

    expect(getTilePlacementFromBoard(otherBoard, [23, 45])).toStrictEqual({ boardTile: startingTile });
  });
});

describe('canConnectTiles', () => {
  it('should be able to connect two road edges', () => {
    const startingTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.N,
    );

    expect(canConnectTiles(startingTile, startingTile, TileOrientation.W)).toEqual(true);
    expect(canConnectTiles(startingTile, startingTile, TileOrientation.E)).toEqual(true);
  });

  it('should not be able to connect city and field edges', () => {
    const startingTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.N,
    );

    expect(canConnectTiles(startingTile, startingTile, TileOrientation.N)).toEqual(false);
    expect(canConnectTiles(startingTile, startingTile, TileOrientation.S)).toEqual(false);
  });
});

describe('canPlaceTile', () => {
  it('should be able to place a field tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD]),
      TileOrientation.N,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(true);
  });

  it('should be able to place a field and road tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.N,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(true);
  });

  it('should be able to place a turned starting tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD]),
      TileOrientation.S,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(true);
  });

  it('should not be able to place a turned field and road tile below the starting tile', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.E,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, -1])).toEqual(false);
  });

  it('should not be able to place a tile on top of another', () => {
    const fieldTile = createBoardTile(
      createTile([TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.E,
    );

    expect(canPlaceTile(standardBoard, fieldTile, [0, 0])).toEqual(false);
  });

  it('should be to handle a complex situation', () => {
    const belowTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.E,
    );

    const rightTile = createBoardTile(
      createTile([TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD]),
      TileOrientation.W,
    );

    const complexBoard: Board = {
      ['0:0']: {
        boardTile: startingTile,
      },
      ['1:-1']: {
        boardTile: rightTile,
      },
      ['0:-2']: {
        boardTile: belowTile,
      },
      ['-1:-1']: {
        boardTile: startingTile,
      },
    };

    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.CITY]),
      TileOrientation.S,
    );

    expect(canPlaceTile(complexBoard, turnedTile, [0, -1])).toEqual(true);
  });
});

describe('placeTile', () => {
  it('should be able to place a new tile on the board', () => {
    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY]),
      TileOrientation.W,
    );

    expect(placeTile(standardBoard, turnedTile, [1, 0]))
      .toEqual({
        ['0:0']: { boardTile: startingTile },
        ['1:0']: { boardTile: turnedTile },
      });
  });

  it('should not be able to place a new tile an existing tile', () => {
    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY]),
      TileOrientation.W,
    );

    expect(() => {
      placeTile(standardBoard, turnedTile, [0, 0]);
    }).toThrow(Error);
  });

  it('should not be able to place impossible connection', () => {
    const turnedTile = createBoardTile(
      createTile([TileEdge.ROAD, TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD]),
      TileOrientation.W,
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
      TileOrientation.W,
    );

    expect(placeTile(standardBoard, turnedTile, [1, 0], claimed))
      .toEqual({
        ['0:0']: { boardTile: startingTile },
        ['1:0']: { boardTile: turnedTile, claimed },
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
      TileOrientation.W,
    );

    expect(() => {
      placeTile(standardBoard, turnedTile, [1, 0], claimed);
    }).toThrow(Error);
  });
});
