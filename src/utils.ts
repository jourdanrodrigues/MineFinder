export function range(number: number): number[] {
  return Array.from(new Array(number).keys())
}

export class SuperSet<T> extends Set<T> {
  difference(other: Set<T> | SuperSet<T> | T[]): SuperSet<T> {
    return new SuperSet([...Array.from(this).filter((item) => !new Set(other).has(item))])
  }

  union(other: Set<T> | SuperSet<T> | T[]): SuperSet<T> {
    return new SuperSet([...Array.from(this), ...Array.from(other)])
  }

  intersection(other: Set<T> | SuperSet<T> | T[]): SuperSet<T> {
    return new SuperSet([...Array.from(this).filter((item) => new Set(other).has(item))])
  }
}