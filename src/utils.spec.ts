import { areNeighbors } from '@/utils.ts';

describe('areNeighbors', () => {
  it('should return true if other is neighbor', () => {
    const neighbors = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ];
    const subject = { x: 1, y: 1 };

    expect(neighbors.every((neighbor) => areNeighbors(neighbor, subject))).toBe(
      true,
    );
  });
  it('should return false if other is not neighbor', () => {
    const neighbors = [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
      { x: 6, y: 7 },
      { x: 7, y: 6 },
      { x: 7, y: 7 },
    ];
    const subject = { x: 5, y: 5 };

    expect(neighbors.every((neighbor) => areNeighbors(neighbor, subject))).toBe(
      false,
    );
  });
});
