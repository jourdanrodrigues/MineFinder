import {useState, useCallback} from 'react'

interface SetState<T> {
  data: Set<T>
  add: (item: T) => void
  addMany: (item: T[]) => void
}

export function useBooleanState(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [flag, setFlag] = useState(initialValue);
  return [
    flag,
    useCallback(() => setFlag(true), []),
    useCallback(() => setFlag(false), []),
    useCallback(() => setFlag((value) => !value), []),
  ]
}

export function useSetstate<T>(): SetState<T> {
  const [object, setObject] = useState<Set<T>>(new Set())
  return {
    data: object,
    add: (item) => setObject((state) => new Set([...Array.from(state), item])),
    addMany: (items) => setObject((state) => new Set([...Array.from(state), ...items]))
  }
}