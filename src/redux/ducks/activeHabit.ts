//@ts-nocheck
const initialState = localStorage.getItem('habit_active') ? {
  goalIndex: JSON.parse(localStorage.getItem('habit_active')).goalIndex || 0,
  habitIndex: JSON.parse(localStorage.getItem('habit_active')).habitIndex || 0
}
  : { goalIndex: 0, habitIndex: 0 };

export const Types = {
  ACTIVE_HABIT: 'active_habit/ACTIVE_HABIT'
};

interface ActiveHabit {
  goalIndex: number;
  habitIndex: number;
}

interface Payload {
  payload: ActiveHabit;
  type: string;
}

export function reducer(state = initialState, action: Payload): any {
  switch (action.type) {
    case Types.ACTIVE_HABIT:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export function changeActiveHabitState(state: ActiveHabit): any {
  console.log("index", state);

  return {
    type: Types.ACTIVE_HABIT,
    payload: state
  };
}
