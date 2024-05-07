import { Board } from '~models/board.ts';

import { tileImage } from './tile.ts';

function make(
  tag: string,
  attributes: Record<string, string | number>,
  children: (HTMLElement | SVGElement | null)[] = [],
): HTMLElement {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value.toString());
  });

  children.forEach((child) => child && element.appendChild(child));

  return element;
}

export function renderBoard(board: Board): HTMLElement {
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
      const { tile, orientation } = boardPlacement.tile;

      return make(
        'div',
        {
          class: `tile ${orientation}`,
          style: `grid-column-start: ${(x - (minx - 1)) + 1}; grid-row-start: ${(y - (miny - 1)) + 1}`
        },
        [tileImage(tile)],
      );
    }),
  );
}
