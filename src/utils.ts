export function range(number: number): number[] {
  return Array.from(new Array(number).keys())
}

export function createUUID(): string {
  if ('randomUUID' in crypto) return crypto.randomUUID()
  // Solution from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
  let salt = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const newChar = (salt + Math.random() * 16) % 16 | 0
    salt = Math.floor(salt / 16)
    return (char === 'x' ? newChar : ((newChar & 0x3) | 0x8)).toString(16)
  })
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
