import { Reducer } from 'redux';

import {
  UsersStateType, UsersActionsType, ADD_USER, DELETE_USER, SET_MI_USER,
} from './types';
import getLocalStorage from '~/resources';

const defaultState: UsersStateType = {
  byId: { '1defaultuser': { id: '1defaultuser', name: 'defaultuser' } },
  allId: ['1defaultuser'],
  miId: '1defaultuser',
};
const {
  stateLocalstorage,
  setStateLocalstorage,
} = getLocalStorage('users', defaultState);

const reducer: Reducer<UsersStateType, UsersActionsType> = (
  state = stateLocalstorage,
  action,
) => {
  if (action.type === ADD_USER) {
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

  if (action.type === DELETE_USER) {
    const { id } = action.payload;
    const newState = {
      ...state,
      allId: state.allId.filter((elId) => elId !== id),
    };

    delete newState.byId[id];

    setStateLocalstorage(newState);
    return newState;
  }

  if (action.type === SET_MI_USER) {
    const { id } = action.payload;
    const newState = { ...state, miId: id };

    setStateLocalstorage(newState);
    return newState;
  }

  return state;
};

export default reducer;
