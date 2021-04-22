import {
  AddUserActionType, ADD_USER, DeleteUserActionType,
  DELETE_USER, SetMiUserActionType, SET_MI_USER,
} from './types';

export const addUserAction = (name: string): AddUserActionType => ({
  type: ADD_USER,
  payload: { name },
});

export const deleteUserAction = (id: string): DeleteUserActionType => ({
  type: DELETE_USER,
  payload: { id },
});

export const setMiUserAction = (id: string): SetMiUserActionType => ({
  type: SET_MI_USER,
  payload: { id },
});
