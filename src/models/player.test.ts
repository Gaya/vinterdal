import { createPlayer, PlayerColor } from './player.ts';

describe('createPlayer', () => {
  it('should create a player with given properties', () => {
    expect(createPlayer({ color: PlayerColor.RED })).toEqual({ color: PlayerColor.RED });
  });
})
