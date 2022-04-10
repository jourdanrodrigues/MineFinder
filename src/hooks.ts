import {useState, useCallback} from 'react'

export function useBooleanState(initialValue: boolean = false): [boolean, () => void, () => void, () => void] {
  const [flag, setFlag] = useState(initialValue);
  return [
    flag,
    useCallback(() => setFlag(true), []),
    useCallback(() => setFlag(false), []),
    useCallback(() => setFlag((value) => !value), []),
  ]
}