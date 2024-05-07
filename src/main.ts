import {
  ccccCityBonus,
  ccrcCity,
  cfcf,
  cffc,
  cffcCity,
  cfrr,
  crfr,
  fcfcCity,
  ffrr,
  frfr,
  frrr,
  rrrr,
} from '~parts/tiles/base.ts';

import './style.css';

import { tileImage } from './view/tile.ts';

function start() {
  const app = document.getElementById('app');

  if (!app) {
    return;
  }

  const tiles = [rrrr, frrr, ffrr, frfr, crfr, cfcf, cffc, cfrr, cffcCity, ccrcCity, fcfcCity, ccccCityBonus];

  tiles.forEach((t) => {
    app.appendChild(tileImage(t));
  });
}

start();
