import {
  combineReducers, createStore, Store, Dispatch,
} from 'redux';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import usersReducer, { UsersActionsType } from './users';
import categoriesReducer, { CategoriesActionsType } from './categories';

const rootReducer = combineReducers({
  users: usersReducer,
  categories: categoriesReducer,
});
type ActionsType = UsersActionsType | CategoriesActionsType
export type StateType = ReturnType<typeof rootReducer>

export const useSelector: TypedUseSelectorHook<StateType> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<Dispatch<ActionsType>>();

const store: Store<
  StateType,
  ActionsType
> = createStore(rootReducer, devToolsEnhancer({}));

export default store;
