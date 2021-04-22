interface СategoryType {
  id: string
  name: string
}
export interface CategoriesStateType {
  byId: {
    [id: string]: СategoryType
  },
  allId: string[],
  defaultCategoryId: string
}

export const ADD_СATEGORY = 'ADD_СATEGORY';
export interface AddСategoryActionType {
  type: typeof ADD_СATEGORY
  payload: { name: string }
}

export const DELETE_СATEGORY = 'DELETE_СATEGORY';
export interface DeleteСategoryActionType {
  type: typeof DELETE_СATEGORY
  payload: { id: string }
}

export const SET_DEFAULT_CATEGORY = 'SET_DEFAULT_CATEGORY';
export interface SetDefaultCategoryActionType {
  type: typeof SET_DEFAULT_CATEGORY
  payload: { id: string }
}

export type CategoriesActionsType =
  AddСategoryActionType
  | DeleteСategoryActionType
  | SetDefaultCategoryActionType;
