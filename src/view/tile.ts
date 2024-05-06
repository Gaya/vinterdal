import { Tile, TileEdge } from '~models/tile.ts';

function make(
  tag: string,
  attributes: Record<string, string | number>,
  children: (SVGElement | null)[] = [],
): SVGElement {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value.toString());
  });

  children.forEach((child) => child && element.appendChild(child));

  return element;
}

function startRoadByIndex(index: number): [number, number] {
  let x = 0;
  let y = 0;

  switch (index) {
    case 0:
    case 2:
      x = 50;
      break;
    case 1:
      x = 100;
      break;
    default:
    case 3:
      x = 0;
      break;
  }

  switch (index) {
    case 3:
    case 1:
      y = 50;
      break;
    case 2:
      y = 100;
      break;
    default:
    case 0:
      y = 0;
      break;
  }

  return [x, y];
}

function roadPath(roads: [TileEdge, number][]): string {
  if (roads.length === 4) {
    return 'M 50,0 L 50,100 M 0,50 L 100,50';
  }

  if (roads.length === 3) {
    return roads
      .map(([_, index]) => {
        const [x, y] = startRoadByIndex(index);

        return `M ${x},${y} L 50,50`;
      }).join(' ');
  }

  return `M ${startRoadByIndex(roads[0][1]).join(',')} C 50,50 50,50 ${startRoadByIndex(roads[1][1]).join(',')}`;
}

export function tileImage(tile: Tile): SVGElement {
  const roads: [TileEdge, number][] = tile.edges
    .map((edge, index): [TileEdge, number] => [edge, index])
    .filter(([edge]) => edge === TileEdge.ROAD);

  console.log(roads);

  return make(
    'svg',
    { viewBox: '0 0 100 100', role: 'img' },
    [
      make(
        'rect',
        { x: '0', y: '0', width: '100', height: '100', fill: 'green' }
      ),
      roads.length > 0 ? make(
        'path',
        {
          stroke: 'white',
          'stroke-width': '10',
          fill: 'none',
          d: roadPath(roads),
        }
      ) : null,
    ]
  );
}
