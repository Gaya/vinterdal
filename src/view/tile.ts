import { Tile } from '~models/tile.ts';

function make(
  tag: string,
  attributes: Record<string, string | number>,
  children: SVGElement[] = [],
): SVGElement {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value.toString());
  });

  children.forEach((child) => element.appendChild(child));

  return element;
}

export function tileImage(tile: Tile): SVGElement {
  return make(
    'svg',
    { viewBox: '0 0 100 100', role: 'img' },
    [
      make(
        'rect',
        { x: '0', y: '0', width: '100', height: '100', fill: 'green' }
      ),
    ]
  );
}
