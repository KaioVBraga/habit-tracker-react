const initialState = { screen: 'category' };

export const Types = {
  GOAL_MODAL: 'GOAL_MODAL'
};

interface GoalModal {
  screen: string;
}

interface Payload {
  payload: GoalModal;
  type: string;
}

export function reducer(state = initialState, action: Payload): any {
  switch (action.type) {
    case Types.GOAL_MODAL:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export function changeGoalModalState(state: GoalModal): any {
  return {
    type: Types.GOAL_MODAL,
    payload: state
  };
}
