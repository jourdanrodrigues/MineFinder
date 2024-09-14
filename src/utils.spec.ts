import { SuperSet } from '@/utils';

describe('SuperSet.intersection', () => {
  it('should find intersection between the sets', () => {
    const output = new SuperSet([1, 2]).intersection(new Set([2, 3]));

    expect(Array.from(output)).toEqual([2]);
  });

  it('should accept an array', () => {
    const output = new SuperSet([1, 2]).intersection([2, 3]);

    expect(Array.from(output)).toEqual([2]);
  });
});

describe('SuperSet.union', () => {
  it('should unite the sets', () => {
    const output = new SuperSet([1, 2]).union(new Set([2, 3]));

    expect(Array.from(output)).toEqual([1, 2, 3]);
  });

  it('should accept an array', () => {
    const output = new SuperSet([1, 2]).union([2, 3]);

    expect(Array.from(output)).toEqual([1, 2, 3]);
  });
});

describe('SuperSet.difference', () => {
  it('should return the difference between the sets', () => {
    const output = new SuperSet([1, 2]).difference(new Set([2, 3]));

    expect(Array.from(output)).toEqual([1]);
  });

  it('should accept an array', () => {
    const output = new SuperSet([1, 2]).difference([2, 3]);

    expect(Array.from(output)).toEqual([1]);
  });
});
