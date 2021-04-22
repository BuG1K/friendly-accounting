import { StateType } from './store';

export const сategoriesStateSelect = () => (state: StateType) =>
  state.categories.byId;

export const сategoriesArraySelect = () => (state: StateType) => {
  const { allId, byId } = state.categories;

  return allId.map((id) => byId[id]);
};

export const defaultCategorySelect = () => (state: StateType) =>
  state.categories.byId[state.categories.defaultCategoryId];

export const usersStateSelect = () => (state: StateType) => state.users.byId;

export const uersArraySelect = () => (state: StateType) => {
  const { allId, byId } = state.users;

  return allId.map((id) => byId[id]);
};

export const miSelect = () => (
  state: StateType,
) => state.users.byId[state.users.miId];
