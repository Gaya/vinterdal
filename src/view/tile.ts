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
      ...(tile.middle === TileMiddle.FARM ? [
        make('path', { fill: '#2f1a04', d: "M 36.683 54.493 L 36.683 33.786 C 36.683 31.301 38.698 29.286 41.183 29.286 C 45.743 29.286 54.37 29.286 58.93 29.286 C 61.416 29.286 63.43 31.301 63.43 33.786 L 63.43 54.493 L 71.357 54.493 L 71.357 26.187 C 71.357 25.182 70.854 24.244 70.017 23.688 C 66.289 21.212 55.803 14.249 51.716 11.536 C 50.711 10.868 49.403 10.868 48.397 11.536 C 44.311 14.249 33.825 21.212 30.097 23.688 C 29.259 24.244 28.756 25.182 28.756 26.187 C 28.756 32.402 28.756 54.493 28.756 54.493 L 36.683 54.493 Z" }),
        make('path', { fill: '#2f1a04', d: "M 59.807 54.493 L 40.309 54.493 L 50.057 44.759 L 59.807 54.493 Z M 47.934 42.639 L 39.683 50.876 L 39.683 34.403 L 47.934 42.639 Z M 60.43 34.403 L 60.43 50.876 L 52.18 42.639 L 60.43 34.403 Z M 50.057 40.52 L 41.809 32.286 L 58.305 32.286 L 50.057 40.52 Z" }),
      ] : []),
    ]
  );
}
