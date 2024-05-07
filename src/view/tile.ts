import { Tile, TileEdge, TileMiddle } from '~models/tile.ts';

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

  if (roads.length === 2) {
    return `M ${startRoadByIndex(roads[0][1]).join(',')} C 50,50 50,50 ${startRoadByIndex(roads[1][1]).join(',')}`;
  }

  const [x, y] = startRoadByIndex(roads[0][1]);
  return `M ${x},${y} L 50,50`;
}

function cityPath(tile: Tile, cities: [TileEdge, number][]): string {
  if (tile.middle === TileMiddle.CITY) {
    if (cities.length === 4) {
      return 'M -1,-1 L -1,101 L 101,101 L 101,-1';
    }

    if (cities.length === 3) {
      return 'M -1,100 C 30,40 70,40 101,100 L 101,-1 L -1,-1';
    }

    if (cities.length === 2) {
      if (cities[0][1] === 0) {
        return 'M -1,100 C 20,40  40,20  101,-1 L -1,-1';
      }

      return 'M -1,-1 C 20,30  80,30  101,-1 L 101,101 C 80,70  20,70  -1,101';
    }
  }

  return cities.map(([_, index]) => {
    switch (index) {
      case 3:
        return 'M -1,0 C 15,20 15,80 -1,100 L -1,0';
      case 2:
        return 'M 0,101 C 20,85 80,85 100,101 L 0,101';
      case 1:
        return 'M 101,0 C 85,20 85,80 101,100 L 101,0';
      default:
      case 0:
        return 'M 0,-1 C 20,15 80,15 100,-1 L 0,-1';
    }
  }).join(' ')
}

export function tileImage(tile: Tile): SVGElement {
  let mappedEdged = tile.edges
    .map((edge, index): [TileEdge, number] => [edge, index]);
  const roads: [TileEdge, number][] = mappedEdged
    .filter(([edge]) => edge === TileEdge.ROAD);
  const cities: [TileEdge, number][] = mappedEdged
    .filter(([edge]) => edge === TileEdge.CITY);

  return make(
    'svg',
    { viewBox: '0 0 100 100', role: 'img' },
    [
      make(
        'rect',
        { x: '0', y: '0', width: '100', height: '100', fill: '#1a881d' }
      ),
      roads.length > 0 ? make(
        'path',
        {
          stroke: '#6e3412',
          'stroke-width': '10',
          fill: 'none',
          d: roadPath(roads),
        }
      ) : null,
      cities.length > 0 ? make(
        'path',
        {
          stroke: '#794a10',
          'stroke-width': '2',
          'stroke-location': 'outside',
          fill: '#e38613',
          d: cityPath(tile, cities),
        }
      ) : null,
      tile.hasBonus ? make(
        'path',
        {
          fill: '#2146c4',
          d: 'M 18.203 8.459 C 18.203 8.459 17.599 8.459 17.462 8.459 C 15.439 8.459 13.676 7.686 12.279 6.281 C 10.884 7.686 9.12 8.459 7.098 8.459 C 6.962 8.459 6.357 8.459 6.357 8.459 C 6.357 8.459 6.357 9.909 6.357 10.755 C 6.357 14.885 8.875 18.355 12.279 19.34 C 15.687 18.355 18.203 14.885 18.203 10.755 C 18.203 9.909 18.203 8.459 18.203 8.459 Z'
        },
      ) : null,
    ]
  );
}
