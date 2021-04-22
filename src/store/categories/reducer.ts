import { Reducer } from 'redux';

import {
  CategoriesStateType, CategoriesActionsType,
  ADD_СATEGORY, DELETE_СATEGORY, SET_DEFAULT_CATEGORY,
} from './types';

import getLocalStorage from '~/resources';

const defaultState: CategoriesStateType = {
  byId: { '1defaultcategor': { id: '1defaultcategor', name: 'defaultcategor' } },
  allId: ['1defaultcategor'],
  defaultCategoryId: '1defaultcategor',
};
const {
  stateLocalstorage,
  setStateLocalstorage,
} = getLocalStorage('categories', defaultState);

const reducer: Reducer<CategoriesStateType, CategoriesActionsType> = (
  state = stateLocalstorage,
  action,
) => {
  if (action.type === ADD_СATEGORY) {
    const { name } = action.payload;
    const id = String(new Date());
    const newState = {
      ...state,
      byId: {
        ...state.byId,
        [id]: { id, name },
      },
      allId: [...state.allId, id],
    };

    setStateLocalstorage(newState);
    return newState;
  }

  if (action.type === DELETE_СATEGORY) {
    const { id } = action.payload;
    const newState = {
      ...state,
      allId: state.allId.filter((elId) => elId !== id),
    };

    delete newState.byId[id];

    setStateLocalstorage(newState);
    return newState;
  }

  if (action.type === SET_DEFAULT_CATEGORY) {
    const { id } = action.payload;
    const newState = { ...state, defaultCategoryId: id };

    setStateLocalstorage(newState);
    return newState;
  }

  return state;
};

export default reducer;
