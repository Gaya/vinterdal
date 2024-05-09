import {
  ClaimLocation,
  ClaimType,
  createTile,
  createTiles,
  TileEdge,
  TileMiddle,
} from '~models/tile.ts';

export const ffffFarm = createTile(
  [TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD],
  TileMiddle.FARM,
  {
    [ClaimLocation.C]: ClaimType.FARM,
    [ClaimLocation.S]: ClaimType.FIELD,
  }
);

export const ffrfFarm = createTile(
  [TileEdge.FIELD, TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD],
  TileMiddle.FARM,
  {
    [ClaimLocation.C]: ClaimType.FARM,
    [ClaimLocation.SW]: ClaimType.FIELD,
    [ClaimLocation.S]: ClaimType.ROAD,
  }
);

export const ccccCityBonus = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.C]: ClaimType.CITY,
  },
  { bonus: true },
);

export const ccfcCity = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.FIELD,
  },
);

export const ccfcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.FIELD,
  },
  { bonus: true },
);

export const ccrcCity = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.ROAD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
  },
);

export const ccrcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.ROAD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
  },
  { bonus: true },
);

export const cffcCity = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.NW]: ClaimType.CITY,
    [ClaimLocation.SE]: ClaimType.FIELD,
  },
);

export const cffcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.NW]: ClaimType.CITY,
    [ClaimLocation.SE]: ClaimType.FIELD,
  },
  { bonus: true },
);

export const crrcCity = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.NW]: ClaimType.CITY,
    [ClaimLocation.E]: ClaimType.ROAD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
  },
);

export const crrcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.NW]: ClaimType.CITY,
    [ClaimLocation.E]: ClaimType.ROAD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
  },
  { bonus: true },
);

export const fcfcCity = createTile(
  [TileEdge.FIELD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.N]: ClaimType.FIELD,
    [ClaimLocation.S]: ClaimType.FIELD,
    [ClaimLocation.C]: ClaimType.CITY,
  },
);

export const fcfcCityBonus = createTile(
  [TileEdge.FIELD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  {
    [ClaimLocation.N]: ClaimType.FIELD,
    [ClaimLocation.S]: ClaimType.FIELD,
    [ClaimLocation.C]: ClaimType.CITY,
  },
  { bonus: true },
);

export const cffc = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.W]: ClaimType.CITY,
    [ClaimLocation.C]: ClaimType.FIELD,
  },
);

export const cfcf = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY, TileEdge.FIELD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.CITY,
    [ClaimLocation.C]: ClaimType.FIELD,
  },
);

export const cfff = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.C]: ClaimType.FIELD,
  },
);

export const cfrr = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.ROAD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.E]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
    [ClaimLocation.W]: ClaimType.ROAD,
  },
);

export const crrf = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.FIELD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.ROAD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
  },
);

export const crrr = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.ROAD,
    [ClaimLocation.W]: ClaimType.ROAD,
    [ClaimLocation.E]: ClaimType.ROAD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
    [ClaimLocation.NW]: ClaimType.FIELD,
  },
);

export const crfr = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.CITY,
    [ClaimLocation.S]: ClaimType.FIELD,
    [ClaimLocation.C]: ClaimType.ROAD,
    [ClaimLocation.NW]: ClaimType.FIELD,
  },
);

export const startingTile = crfr;

export const frfr = createTile(
  [TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.FIELD,
    [ClaimLocation.S]: ClaimType.FIELD,
    [ClaimLocation.C]: ClaimType.ROAD,
  },
);

export const ffrr = createTile(
  [TileEdge.FIELD, TileEdge.FIELD, TileEdge.ROAD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.NE]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
    [ClaimLocation.S]: ClaimType.ROAD,
  },
);

export const frrr = createTile(
  [TileEdge.FIELD, TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.N]: ClaimType.FIELD,
    [ClaimLocation.SW]: ClaimType.FIELD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.W]: ClaimType.ROAD,
    [ClaimLocation.E]: ClaimType.ROAD,
    [ClaimLocation.S]: ClaimType.ROAD,
  },
);

export const rrrr = createTile(
  [TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD],
  TileMiddle.FIELD,
  {
    [ClaimLocation.SW]: ClaimType.FIELD,
    [ClaimLocation.SE]: ClaimType.FIELD,
    [ClaimLocation.NW]: ClaimType.FIELD,
    [ClaimLocation.NE]: ClaimType.FIELD,
    [ClaimLocation.N]: ClaimType.ROAD,
    [ClaimLocation.W]: ClaimType.ROAD,
    [ClaimLocation.E]: ClaimType.ROAD,
    [ClaimLocation.S]: ClaimType.ROAD,
  },
);

export default [
  ...createTiles(ffffFarm, 4),
  ...createTiles(ffrfFarm, 2),
  ccccCityBonus,
  ...createTiles(ccfcCity, 3),
  ccfcCityBonus,
  ccrcCity,
  ...createTiles(ccrcCityBonus, 2),
  ...createTiles(cffcCity, 3),
  ...createTiles(cffcCityBonus, 2),
  ...createTiles(crrcCity, 3),
  ...createTiles(crrcCityBonus, 2),
  fcfcCity,
  ...createTiles(fcfcCityBonus, 2),
  ...createTiles(cffc, 2),
  ...createTiles(cfcf, 3),
  ...createTiles(cfff, 5),
  ...createTiles(cfrr, 3),
  ...createTiles(crrf, 3),
  ...createTiles(crrr, 3),
  ...createTiles(crfr, 3),
  ...createTiles(frfr, 8),
  ...createTiles(ffrr, 9),
  ...createTiles(frrr, 4),
  rrrr,
];
