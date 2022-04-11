import {useState, useCallback, useMemo} from 'react'

interface SetState<T> {
  has: (item: T) => boolean
  add: (items: T[]) => void
  remove: (items: T[]) => void
  clear: () => void
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
  return useMemo(() => ({
    has: (item) => object.has(item),
    add: (items) => setObject((state) => new Set([...Array.from(state), ...items])),
    remove: (items) => {
      const setItems = new Set(items)
      setObject((state) => new Set(Array.from(state).filter((item) => !setItems.has(item))))
    },
    clear: () => setObject(new Set()),
  }), [object])
}