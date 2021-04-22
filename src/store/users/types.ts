interface UserType {
  id: string
  name: string
}
export interface UsersStateType {
  miId: string,
  byId: {
    [id: string]: UserType
  },
  allId: string[],
}

export const ADD_USER = 'ADD_USER';
export interface AddUserActionType {
  type: typeof ADD_USER
  payload: { name: string }
}

export const DELETE_USER = 'DELETE_USER';
export interface DeleteUserActionType {
  type: typeof DELETE_USER
  payload: { id: string }
}

export const SET_MI_USER = 'SET_MI_USER';
export interface SetMiUserActionType {
  type: typeof SET_MI_USER
  payload: { id: string }
}

export type UsersActionsType =
  AddUserActionType
  | DeleteUserActionType
  | SetMiUserActionType;
