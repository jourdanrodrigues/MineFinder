import Cell, { areNeighbors } from '@/Cell';

describe('areNeighbors', () => {
  it('should return true if other is neighbor', () => {
    const neighbors = [
      new Cell(0, 0),
      new Cell(0, 1),
      new Cell(1, 0),
      new Cell(0, 2),
      new Cell(2, 0),
      new Cell(1, 2),
      new Cell(2, 1),
      new Cell(2, 2),
    ];
    const subject = new Cell(1, 1);

    expect(neighbors.every((neighbor) => areNeighbors(neighbor, subject))).toBe(
      true,
    );
  });
  it('should return false if other is not neighbor', () => {
    const neighbors = [
      new Cell(3, 3),
      new Cell(3, 4),
      new Cell(4, 3),
      new Cell(6, 7),
      new Cell(7, 6),
      new Cell(7, 7),
    ];
    const subject = new Cell(5, 5);

    expect(neighbors.every((neighbor) => areNeighbors(neighbor, subject))).toBe(
      false,
    );
  });
});
