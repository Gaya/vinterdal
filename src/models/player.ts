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

export function playerColor(player?: Player): string {
  const { color } = player || { color: PlayerColor.BLACK };

  switch (color) {
    case PlayerColor.WHITE:
      return '#FFF';
    case PlayerColor.RED:
      return '#F00';
    case PlayerColor.BLUE:
      return '#00F';
    case PlayerColor.YELLOW:
      return '#FF0';
    default:
    case PlayerColor.BLACK:
      return '#000';
  }
}

export function createPlayer(properties: Player): Player {
  return {
    ...properties,
  };
}
