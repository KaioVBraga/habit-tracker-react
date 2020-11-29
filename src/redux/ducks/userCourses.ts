export const Types = {
  CHANGE_USER: 'CHANGE_USER'
};

const initialState = {};


interface Retorno {
  name: string;
}

interface Payload {
  payload: Retorno;
  type: string;
}

export function reducer(state = initialState, action: Payload): any {
  switch (action.type) {
    case Types.CHANGE_USER:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export function changeUser(filter: Retorno): any {
  return {
    type: Types.CHANGE_USER,
    payload: filter
  };
}
