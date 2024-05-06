import { rrrr } from '~parts/tiles/base.ts';

import './style.css';

import { tileImage } from './view/tile.ts';

function start() {
  const img = tileImage(rrrr);

  document.getElementById('app')?.appendChild(img);
}

start();
