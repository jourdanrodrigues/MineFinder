import {useState, useCallback, useMemo} from 'react'
import {SuperSet} from 'utils'

interface SetState<T> {
  has: (item: T) => boolean
  add: (items: T[]) => void
  remove: (items: T[]) => void
  clear: () => void
  getCopy: () => SuperSet<T>
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
  const [object, setObject] = useState<SuperSet<T>>(new SuperSet())
  return useMemo(() => ({
    getCopy: () => new SuperSet(object),
    has: (item) => object.has(item),
    add: (items) => setObject((state) => new SuperSet([...Array.from(state), ...items])),
    remove: (items) => {
      const setItems = new SuperSet(items)
      setObject((state) => new SuperSet(Array.from(state).filter((item) => !setItems.has(item))))
    },
    clear: () => setObject(new SuperSet()),
  }), [object])
}