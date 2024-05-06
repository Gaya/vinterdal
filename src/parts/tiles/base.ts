import { createTile, createTiles, TileEdge, TileMiddle } from '~models/tile.ts';

export const ffffCloister = createTile(
  [TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD],
  TileMiddle.CLOISTER,
);

export const ffrfCloister = createTile(
  [TileEdge.FIELD, TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD],
  TileMiddle.CLOISTER,
);

export const ccccCityBonus = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.CITY, TileEdge.CITY],
  TileMiddle.CITY,
  { bonus: true },
);

export const ccfcCity = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
);

export const ccfcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  { bonus: true },
);

export const ccrcCity = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
);

export const ccrcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.CITY, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
  { bonus: true },
);

export const cffcCity = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
);

export const cffcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  { bonus: true },
);

export const crrcCity = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
);

export const crrcCityBonus = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.CITY],
  TileMiddle.CITY,
  { bonus: true },
);

export const fcfcCity = createTile(
  [TileEdge.FIELD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
);

export const fcfcCityBonus = createTile(
  [TileEdge.FIELD, TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY],
  TileMiddle.CITY,
  { bonus: true },
);

export const cffc = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.CITY],
);

export const cfcf = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.CITY, TileEdge.FIELD],
);

export const cfff = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.FIELD, TileEdge.FIELD],
);

export const cfrr = createTile(
  [TileEdge.CITY, TileEdge.FIELD, TileEdge.ROAD, TileEdge.ROAD],
);

export const crrf = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.FIELD],
);

export const crrr = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD],
);

export const crfr = createTile(
  [TileEdge.CITY, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD],
);

export const startingTile = crfr;

export const frfr = createTile(
  [TileEdge.FIELD, TileEdge.ROAD, TileEdge.FIELD, TileEdge.ROAD],
);

export const ffrr = createTile(
  [TileEdge.FIELD, TileEdge.FIELD, TileEdge.ROAD, TileEdge.ROAD],
);

export const frrr = createTile(
  [TileEdge.FIELD, TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD],
);

export const rrrr = createTile(
  [TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD, TileEdge.ROAD],
);

export default [
  ...createTiles(ffffCloister, 4),
  ...createTiles(ffrfCloister, 2),
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
