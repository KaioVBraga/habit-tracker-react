export const Types = {
  GOALS: 'GOALS'
};

const initialState = [] as Goal[];

interface Goal {
  id: number,
  title: String,
  type: String,
  active: Number,
  description: String,
  user_id: Number,
  reward: String,
  createdAt: String,
  updatedAt: String,
  habits: any,
  deadends: {
    id: number;
    limit: string;
    accomplished: boolean | null;
    goal_id: number;
    createdAt: string;
    udpatedAt: string;
  }[]
};

interface Payload {
  payload: Goal[];
  type: string;
}

export function reducer(state = initialState, action: Payload): any {
  switch (action.type) {
    case Types.GOALS:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export function changeGoals(filter: Goal[]): any {
  return {
    type: Types.GOALS,
    payload: filter
  };
}