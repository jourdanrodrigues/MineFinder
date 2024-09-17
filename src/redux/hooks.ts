import { useDispatch, useSelector } from 'react-redux'; // eslint-disable-line @typescript-eslint/no-restricted-imports
import type { AppDispatch, RootState } from '@/redux/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
