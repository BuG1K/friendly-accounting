const getLocalStorage = <S>(key: string, defaultState: S) => {
  const json = localStorage.getItem(key);

  return {
    stateLocalstorage: json ? JSON.parse(json) as S : defaultState,
    setStateLocalstorage: (newState: S) =>
      localStorage.setItem(key, JSON.stringify(newState)),
  };
};

export default getLocalStorage;
