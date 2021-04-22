import {
  ADD_СATEGORY, AddСategoryActionType,
  DELETE_СATEGORY, DeleteСategoryActionType,
  SetDefaultCategoryActionType, SET_DEFAULT_CATEGORY,
} from './types';

export const addСategoryAction = (name: string): AddСategoryActionType => ({
  type: ADD_СATEGORY,
  payload: { name },
});

export const deleteСategoryAction = (id: string): DeleteСategoryActionType => ({
  type: DELETE_СATEGORY,
  payload: { id },
});

export const setDefaultCategoryAction = (
  id: string,
): SetDefaultCategoryActionType => ({
  type: SET_DEFAULT_CATEGORY,
  payload: { id },
});
