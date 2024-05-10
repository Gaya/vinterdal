import { Board } from '~models/board.ts';
import { playerColor } from '~models/player.ts';

import { tileImage } from './tile.ts';
import make from './make.ts';

function claimed(boardPlacement: Board[0]) {
  if (!boardPlacement.claimed) {
    return null;
  }

  const color = playerColor(boardPlacement.claimed.player);

  console.log(boardPlacement);

  return make(
    'svg',
    {
      viewBox: '0 0 100 100',
      class: 'claim',
    },
    [
      make(
        'path',
        {
          stroke: '#000',
          'stroke-width': 4,
          fill: color,
          d: 'm 31.25,35.016 v 19.906 c 0,4.4688 3.625,8.1094 8.0938,8.1094 h 0.3125 l 1.4531,32.344 c 0.03125,0.84375 0.71875,1.5 1.5625,1.5 h 14.656 c 0.84375,0 1.5312,-0.65625 1.5625,-1.5 l 1.4531,-32.344 h 0.3125 c 4.4688,0 8.0938,-3.6406 8.0938,-8.1094 V 35.016 c 0,-4.4688 -3.625,-8.0938 -8.0938,-8.0938 H 39.344 c -4.4688,0 -8.0938,3.625 -8.0938,8.0938 z',
        },
      ),
      make(
        'path',
        {
          stroke: '#000',
          'stroke-width': 4,
          fill: color,
          d: 'm 60.859,13.984 c 0,5.9961 -4.8633,10.859 -10.859,10.859 -5.9957,0 -10.859,-4.8633 -10.859,-10.859 0,-5.9957 4.8633,-10.859 10.859,-10.859 5.9957,0 10.859,4.8633 10.859,10.859',
        },
      ),
    ]
  )
}

export function renderBoard(board: Board) {
  const root = document.documentElement;
  const boardPlacements = Object.entries(board);
  const [minx, maxx, miny, maxy] = boardPlacements.reduce(([x1, x2, y1, y2], [key]) => {
    const [x, y] = key.split(':').map((i) => parseInt(i, 10));

    return [
      x < x1 ? x : x1,
      x > x2 ? x : x2,
      y < y1 ? y : y1,
      y > y2 ? y : y2,
    ];
  }, [0, 0, 0, 0]);

  const boardWidth = (maxx - minx) + 3;
  const boardHeight = (maxy - miny) + 3;

  root.style.setProperty('--board-cols', boardWidth.toString());
  root.style.setProperty('--board-rows', boardHeight.toString());

  return make(
    'div',
    { class: 'board' },
    Object.entries(board).map(([key, boardPlacement]) => {
      const [x, y] = key.split(':').map((i) => parseInt(i, 10));
      const { tile, orientation } = boardPlacement.boardTile;

      return make(
        'div',
        {
          class: `tile ${orientation}`,
          style: `grid-column-start: ${(x - (minx - 1)) + 1}; grid-row-start: ${(y - (miny - 1)) + 1}`,
          onClick: () => {
            console.log(boardPlacement);
          },
        },
        [
          tileImage(tile),
          claimed(boardPlacement),
        ],
      );
    }),
  );
}
