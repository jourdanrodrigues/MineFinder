export function range(number: number): number[] {
  return Array.from(new Array(number).keys())
}

export function chainCall(...args: Array<() => void>): () => void {
  return () => args.forEach(func => func())
}