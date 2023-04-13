import * as actions from './actionTypes';

export const bugAdded = (description) => {
  return {
    type: actions.BUG_ADD,
    payload: {
      description: description,
    },
  };
};

export const bugRemoved = (id) => {
  return {
    type: actions.REMOVE_BUG,
    payload: {
      id: id,
    },
  };
};

export const bugResolved = (id) => {
  return {
    type: actions.RESOLVE_BUG,
    payload: {
      id: id,
    },
  };
};
