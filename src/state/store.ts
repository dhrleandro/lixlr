/**
 * Landro Daher, 2022
 *
 * Important
 * This state (react-tracked) is the state of the React application, which will be propagated
 * to the state of the Core through the useCanvasPixelEditor hook
 */

import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { createInitialAppState } from '../core/state/State';
import { reducer } from '../core/state/Store';

const initialState = createInitialAppState();

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider: AppStateProvider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
