export enum PlayerColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  BLUE = 'BLUE',
}

export interface Player {
  color: PlayerColor;
}

export function createPlayer(properties: Player): Player {
  return {
    ...properties,
  };
}
